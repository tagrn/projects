# 표준 라이브러리
from os import remove
from datetime import datetime, timedelta


# 서드 파티 라이브러리
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential, load_model
from keras.layers import LSTM, Dropout, Dense, Flatten, AveragePooling1D
from keras.layers.convolutional import Conv1D, MaxPooling1D
from keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
from keras.optimizers import Adam
import pandas as pd
import numpy as np
import requests


# 로컬
from database import crud


default_cnn_model = [
    {"layer_name": "Conv1D", "filters": 128, "kernel_size": 3},
    {"layer_name": "MaxPooling1D", "pool_size": 2},
    {"layer_name": "Conv1D", "filters": 256, "kernel_size": 3},
    {"layer_name": "AveragePooling1D", "pool_size": 2},
]
default_lstm_model = [
    {"layer_name": "LSTM", "units": 32},
    {"layer_name": "Dropout", "rate": 0.1},
    {"layer_name": "LSTM", "units": 128},
    {"layer_name": "Dropout", "rate": 0.1},
]


def data_preprocess(input_data, set_rate):
    input_dataframe = pd.DataFrame(input_data["raw_data"])
    input_dataframe.dropna(inplace=True)

    scaler = MinMaxScaler()
    scale_data = scaler.fit_transform(
        input_dataframe["analysis_value"].values.reshape(
            input_dataframe["analysis_value"].shape[0], -1
        )
    )

    look_back = 14
    x_data, y_data = process_data(scale_data, look_back)
    train_pct = set_rate

    x_train, x_test = (
        x_data[: int(x_data.shape[0] * train_pct)],
        x_data[int(x_data.shape[0] * train_pct) :],
    )
    y_train, y_test = (
        y_data[: int(y_data.shape[0] * train_pct)],
        y_data[int(y_data.shape[0] * train_pct) :],
    )

    processed_data = []
    for i in range(len(input_dataframe) - look_back - 1):
        if i < x_train.shape[0]:
            processed_data.append(
                {
                    "Date": input_dataframe["Date"][i + look_back + 1],
                    "actual": float(input_dataframe["analysis_value"][i + look_back + 1]),
                    "x_train": x_train[i].tolist(),
                    "x_test": None,
                    "y_train": y_train[i].tolist(),
                    "y_test": None,
                }
            )
        else:
            processed_data.append(
                {
                    "Date": input_dataframe["Date"][i + look_back + 1],
                    "actual": float(input_dataframe["analysis_value"][i + look_back + 1]),
                    "x_train": None,
                    "x_test": x_test[i - x_train.shape[0]].tolist(),
                    "y_train": None,
                    "y_test": y_test[i - x_train.shape[0]].tolist(),
                }
            )

    return {
        "processed_data": processed_data,
        "scale": [{"min": scaler.data_min_[0], "max": scaler.data_max_[0]}],
        "set_rate": set_rate,
    }


def cnn_model_training(input_data, user_id, db):
    date, actual, x_train, x_test, y_train, y_test, scale = input_data_to_data_set(input_data)

    adam = Adam(lr=0.003)

    file_path = f"./asset/models/{user_id}.h5"
    callback_checkpoint = ModelCheckpoint(
        filepath=file_path, monitor="val_loss", save_best_only=True, save_weights_only=False
    )
    early_stopping = EarlyStopping(monitor="val_loss", patience=20, verbose=1)
    reduce_lr = ReduceLROnPlateau(monitor="val_loss", factor=0.3, patience=5, min_lr=0.0009)
    callbacks = [early_stopping, callback_checkpoint, reduce_lr]

    model = Sequential()
    exec(custom_layer(default_cnn_model))
    model.add(Flatten())
    model.add(Dense(14, activation="relu"))
    model.add(Dense(1))
    model.compile(optimizer="adam", loss="mse")

    history = model.fit(
        x_train,
        y_train,
        epochs=100,
        batch_size=16,
        validation_data=(x_test, y_test),
        callbacks=callbacks,
        shuffle=True,
    )

    training_model = crud.insert_training_model(
        user_id=user_id,
        db=db,
    )
    training_model_id = training_model.training_model_id

    model_file = open(f"./asset/models/{user_id}.h5", "rb")
    req_upload = {"file": model_file}
    req_data = {"training_model_id": training_model_id}

    req = requests.post(
        "{base_url}/csv/upload/trainingmodel",
        files=req_upload,
        data=req_data,
    )

    result_training = []
    for i in range(len(history.history["loss"])):
        result_training.append(
            {
                "epoch": i,
                "loss": history.history["loss"][i],
                "val_loss": history.history["val_loss"][i],
            }
        )

    remove(f"./asset/models/{user_id}.h5")

    return {"result_training": result_training, "training_model_id": training_model_id}


def lstm_model_training(input_data, user_id, db):
    date, actual, x_train, x_test, y_train, y_test, scale = input_data_to_data_set(input_data)

    adam = Adam(lr=0.003)

    file_path = f"./asset/models/{user_id}.h5"
    callback_checkpoint = ModelCheckpoint(
        filepath=file_path, monitor="val_loss", save_best_only=True, save_weights_only=False
    )
    early_stopping = EarlyStopping(monitor="val_loss", patience=20, verbose=1)
    reduce_lr = ReduceLROnPlateau(monitor="val_loss", factor=0.3, patience=5, min_lr=0.0009)
    callbacks = [early_stopping, callback_checkpoint, reduce_lr]

    model = Sequential()
    exec(custom_layer(default_lstm_model))
    model.add(Dense(1))
    model.compile(loss="mse", optimizer=adam)

    history = model.fit(
        x_train,
        y_train,
        epochs=100,
        batch_size=16,
        validation_data=(x_test, y_test),
        callbacks=callbacks,
        shuffle=True,
    )

    training_model = crud.insert_training_model(
        user_id=user_id,
        db=db,
    )
    training_model_id = training_model.training_model_id

    model_file = open(f"./asset/models/{user_id}.h5", "rb")
    req_upload = {"file": model_file}
    req_data = {"training_model_id": training_model.training_model_id}

    req = requests.post(
        "{base_url}/csv/upload/trainingmodel",
        files=req_upload,
        data=req_data,
    )

    result_training = []
    for i in range(len(history.history["loss"])):
        result_training.append(
            {
                "epoch": i,
                "loss": history.history["loss"][i],
                "val_loss": history.history["val_loss"][i],
            }
        )

    remove(f"./asset/models/{user_id}.h5")

    return {"result_training": result_training, "training_model_id": training_model_id}


def custom_model_training(input_data, input_layer, user_id, db):
    date, actual, x_train, x_test, y_train, y_test, scale = input_data_to_data_set(input_data)

    adam = Adam(lr=0.003)

    file_path = f"./asset/models/{user_id}.h5"
    callback_checkpoint = ModelCheckpoint(
        filepath=file_path, monitor="val_loss", save_best_only=True, save_weights_only=False
    )
    early_stopping = EarlyStopping(monitor="val_loss", patience=20, verbose=1)
    reduce_lr = ReduceLROnPlateau(monitor="val_loss", factor=0.3, patience=5, min_lr=0.0009)
    callbacks = [early_stopping, callback_checkpoint, reduce_lr]

    model = Sequential()
    if input_layer[0] != None:
        exec(custom_layer(input_layer))
    else:
        exec(custom_layer(default_cnn_model))
    model.add(Flatten())
    model.add(Dense(14, activation="relu"))
    model.add(Dense(1))
    model.compile(optimizer="adam", loss="mse")

    history = model.fit(
        x_train,
        y_train,
        epochs=100,
        batch_size=16,
        validation_data=(x_test, y_test),
        callbacks=callbacks,
        shuffle=True,
    )

    training_model = crud.insert_training_model(
        user_id=user_id,
        db=db,
    )
    training_model_id = training_model.training_model_id

    model_file = open(f"./asset/models/{user_id}.h5", "rb")
    req_upload = {"file": model_file}
    req_data = {"training_model_id": training_model_id}

    req = requests.post(
        "{base_url}/csv/upload/trainingmodel",
        files=req_upload,
        data=req_data,
    )

    result_training = []
    for i in range(len(history.history["loss"])):
        result_training.append(
            {
                "epoch": i,
                "loss": history.history["loss"][i],
                "val_loss": history.history["val_loss"][i],
            }
        )

    remove(f"./asset/models/{user_id}.h5")

    return {"result_training": result_training, "training_model_id": training_model_id}


def model_evaluate(input_data, training_model_id):
    date, actual, x_train, x_test, y_train, y_test, scale = input_data_to_data_set(input_data)

    model_file_path = f"./asset/models/{training_model_id}.h5"
    req = requests.get(f"{base_url}/csv/download/trainingmodel/{training_model_id}")
    model_file = open(model_file_path, "wb")
    model_file.write(req.content)
    trained_model = load_model(model_file_path)

    train_evaluate = trained_model.predict(x_train) * (scale["max"] - scale["min"]) + scale["min"]
    test_evaluate = trained_model.predict(x_test) * (scale["max"] - scale["min"]) + scale["min"]

    result_evaluate = []
    for i in range(len(actual)):
        if i < len(train_evaluate):
            result_evaluate.append(
                {
                    "Date": date[i],
                    "actual": actual[i],
                    "train_evaluate": float(train_evaluate[i][0]),
                    "test_evaluate": None,
                }
            )
        else:
            result_evaluate.append(
                {
                    "Date": date[i],
                    "actual": actual[i],
                    "train_evaluate": None,
                    "test_evaluate": float(test_evaluate[i - len(train_evaluate)][0]),
                }
            )

    return {"result_evaluate": result_evaluate}


def predict_future(user_data_set_id, input_data, training_model_id, user_id, period, db):
    date, actual, x_train, x_test, y_train, y_test, scale = input_data_to_data_set(input_data)
    look_back = 14

    model_file_path = f"./asset/models/{training_model_id}.h5"
    req = requests.get(f"{base_url}/csv/download/trainingmodel/{training_model_id}")
    model_file = open(model_file_path, "wb")
    model_file.write(req.content)
    trained_model = load_model(model_file_path)

    callback_checkpoint = ModelCheckpoint(
        filepath=model_file_path, monitor="val_loss", save_best_only=True, save_weights_only=False
    )
    early_stopping = EarlyStopping(monitor="val_loss", patience=20, verbose=1)
    reduce_lr = ReduceLROnPlateau(monitor="val_loss", factor=0.3, patience=5, min_lr=0.0009)
    callbacks = [early_stopping, callback_checkpoint, reduce_lr]

    x_future = x_test
    y_future = y_test

    for i in range(1, period + 1):
        predict_value = trained_model.predict(x_future[-1].reshape(1, look_back, 1))[0][0]
        x_future = np.append(x_future, np.append(x_future[-1][1:], predict_value)).reshape(
            -1, look_back, 1
        )
        y_future = np.append(y_future, predict_value)

        if i % 25 == 0:
            trained_model.fit(
                x_future,
                y_future,
                epochs=100,
                batch_size=16,
                validation_data=(x_train, y_train),
                callbacks=callbacks,
                shuffle=True,
            )
            trained_model = load_model(model_file_path)

    insert_user_data_predict = crud.insert_user_data_predict(
        user_data_set_id=user_data_set_id,
        training_model_id=training_model_id,
        user_id=user_id,
        db=db,
    )

    date_start = datetime.strptime(date[-1], "%Y-%m-%d") + timedelta(days=1)
    date_end = date_start + timedelta(days=period)
    date_predict = [
        date.strftime("%Y-%m-%d")
        for date in pd.date_range(date_start, periods=(date_end - date_start).days + 1)
    ]

    result_predict = []
    for i in range(period):
        result_predict.append(
            {
                "date": date_predict[i],
                "future": y_future[-period + i] * (scale["max"] - scale["min"]) + scale["min"],
            }
        )

    req_upload = {"file": pd.DataFrame(result_predict).to_csv(index=False).encode("utf-8")}
    req_data = {"user_data_predict_id": insert_user_data_predict.user_data_predict_id}
    req = requests.post(
        "{base_url}/csv/upload/userpredictdata",
        files=req_upload,
        data=req_data,
    )

    remove(model_file_path)

    return {"result_predict": result_predict}


def process_data(data, look_back):
    x_data, y_data = [], []
    for i in range(len(data) - look_back - 1):
        x_data.append(data[i : (i + look_back), 0])
        y_data.append(data[(i + look_back), 0])
    return np.array(x_data), np.array(y_data)


def input_data_to_data_set(input_data):
    input_dataframe = pd.DataFrame(input_data["processed_data"])
    set_rate = input_data["set_rate"]

    date = input_dataframe["Date"].tolist()
    actual = input_dataframe["actual"].tolist()
    x_train = np.array(
        input_dataframe["x_train"].loc[: int(len(actual) * set_rate) - 1].tolist()
    ).reshape(-1, 14, 1)
    x_test = np.array(
        input_dataframe["x_test"].loc[int(len(actual) * set_rate) :].tolist()
    ).reshape(-1, 14, 1)
    y_train = np.array(
        input_dataframe["y_train"].loc[: int(len(actual) * set_rate) - 1].tolist()
    ).reshape(-1)
    y_test = np.array(
        input_dataframe["y_test"].loc[int(len(actual) * set_rate) :].tolist()
    ).reshape(-1)
    scale = input_data["scale"][0]

    return date, actual, x_train, x_test, y_train, y_test, scale


def custom_layer(input_layer):
    layer_str = ""
    for i in range(len(input_layer)):
        if input_layer[i]["layer_name"] == "Conv1D":
            filters = input_layer[i]["filters"]
            kernel_size = input_layer[i]["kernel_size"]
            layer_str += f"model.add(Conv1D(filters={filters}, kernel_size={kernel_size}, activation='relu'))"
        elif input_layer[i]["layer_name"] == "MaxPooling1D":
            pool_size = input_layer[i]["pool_size"]
            layer_str += f"model.add(MaxPooling1D(pool_size={pool_size}))"
        elif input_layer[i]["layer_name"] == "AveragePooling1D":
            pool_size = input_layer[i]["pool_size"]
            layer_str += f"model.add(AveragePooling1D(pool_size={pool_size}))"
        elif input_layer[i]["layer_name"] == "LSTM":
            units = input_layer[i]["units"]
            layer_str += f"model.add(LSTM(units={units}))"
        elif input_layer[i]["layer_name"] == "Dropout":
            rate = input_layer[i]["rate"]
            layer_str += f"model.add(Dropout(rate={rate}))"
        if i == 0:
            layer_str = layer_str.rstrip(")")
            if input_layer[i]["layer_name"] == "LSTM":
                layer_str += ", return_sequences=True"
            layer_str += ", input_shape=(x_train.shape[1], x_train.shape[2])))"
        layer_str += "\n"

    return layer_str