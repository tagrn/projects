def prophet_code(item, period_value, cps):

    s = ""
    s += "import warnings\n\n"
    s += "warnings.filterwarnings('ignore')\n\n"
    s += "import pandas as pd\n"
    s += "from fbprophet import Prophet\n\n\n"
    s += "conv_df = 'csv 데이터 입력'\n\n"
    s += "df = pd.DataFrame({'ds': conv_df.index, 'y': conv_df[" + item + "]})\n\n"
    s += "m = Prophet(daily_seasonality=True, changepoint_prior_scale=" + str(cps) + ")\n\n"
    s += "m.fit(df)\n\n"
    s += "future = m.make_future_dataframe(periods=" + str(period_value) + ")\n\n"
    s += "future['day'] = future['ds'].dt.weekday\n"
    s += "future = future[future['day'] <= 4]\n\n"

    s += "forecast = m.predict(future)\n\n"

    s += "s = set(['ds', 'yhat', 'trend', 'weekly', 'yearly'])\n\n"
    s += "if s.issubset(set(forecast.columns)):\n"
    s += "  result = forecast[['ds', 'yhat', 'trend', 'weekly', 'yearly']]\n"
    s += "else: \n"
    s += "  result = forecast[['ds', 'yhat', 'trend', 'weekly']]\n\n"

    s += "conv_df = conv_df.rename({'Date': 'ds'}, axis='columns')\n\n"
    s += "conv_df['ds'] = conv_df['ds'].astype('datetime64[ns]')\n\n"
    s += "result = pd.merge(result, conv_df, how='outer', on='ds')\n\n"
    s += "print(result)\n"

    return s


def tf_data_input_code(analysis_value):
    code_str = f"""from os import remove
from datetime import datetime, timedelta


from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential, load_model
from keras.layers import LSTM, Dropout, Dense, Flatten, AveragePooling1D
from keras.layers.convolutional import Conv1D, MaxPooling1D
from keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
from keras.optimizers import Adam
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np


input_dataframe = pd.read_csv('./csv데이터입력')
input_dataframe = input_dataframe[['Date', '{analysis_value}']]
input_dataframe.columns = ['Date', 'analysis_value']
input_dataframe.dropna(inplace = True)
"""

    return code_str


def tf_data_preprocess_code(set_rate):
    code_str = f"""scaler = MinMaxScaler()
scale_data = scaler.fit_transform(
    input_dataframe["analysis_value"].values.reshape(
        input_dataframe["analysis_value"].shape[0], -1
    )
)


def process_data(data, look_back):
    x_data, y_data = [], []
    for i in range(len(data) - look_back - 1):
        x_data.append(data[i : (i + look_back), 0])
        y_data.append(data[(i + look_back), 0])
    return np.array(x_data), np.array(y_data)


look_back = 14

x_data, y_data = process_data(scale_data, look_back)
train_pct = {set_rate}

x_train, x_test = (
    x_data[: int(x_data.shape[0] * train_pct)],
    x_data[int(x_data.shape[0] * train_pct) :],
)
y_train, y_test = (
    y_data[: int(y_data.shape[0] * train_pct)],
    y_data[int(y_data.shape[0] * train_pct) :],
)

x_train = x_train.reshape(-1, look_back, 1)
x_test = x_test.reshape(-1, look_back, 1)
"""

    return code_str


def tf_cnn_model_training_code():
    code_str = f"""default_cnn_model = [
    {{"layer_name": "Conv1D", "filters": 64, "kernel_size": 2}},
    {{"layer_name": "MaxPooling1D", "pool_size": 2}},
    {{"layer_name": "Conv1D", "filters": 64, "kernel_size": 2}},
    {{"layer_name": "AveragePooling1D", "pool_size": 2}},
]


def custom_layer(input_layer):
    layer_str = ""
    for i in range(len(input_layer)):
        if input_layer[i]["layer_name"] == "Conv1D":
            filters = input_layer[i]["filters"]
            kernel_size = input_layer[i]["kernel_size"]
            layer_str += f"model.add(Conv1D(filters={{filters}}, kernel_size={{kernel_size}}, activation='relu'))"
        elif input_layer[i]["layer_name"] == "MaxPooling1D":
            pool_size = input_layer[i]["pool_size"]
            layer_str += f"model.add(MaxPooling1D(pool_size={{pool_size}}))"
        elif input_layer[i]["layer_name"] == "AveragePooling1D":
            pool_size = input_layer[i]["pool_size"]
            layer_str += f"model.add(AveragePooling1D(pool_size={{pool_size}}))"
        elif input_layer[i]["layer_name"] == "LSTM":
            units = input_layer[i]["units"]
            layer_str += f"model.add(LSTM(units={{units}}))"
        elif input_layer[i]["layer_name"] == "Dropout":
            rate = input_layer[i]["rate"]
            layer_str += f"model.add(Dropout(rate={{rate}}))"
        if i == 0:
            layer_str = layer_str.rstrip(")")
            if input_layer[i]["layer_name"] == "LSTM":
                layer_str += ", return_sequences=True"
            layer_str += ", input_shape=(x_train.shape[1], x_train.shape[2])))"
        layer_str += "\\n"

    return layer_str


adam = Adam(lr=0.003)

file_path = f"./tf_model.h5"
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

plt.plot(history.history['loss'], label='train')
plt.plot(history.history['val_loss'], label='test')
plt.legend()
plt.show()"""

    return code_str


def tf_lstm_model_training_code():
    code_str = f"""default_lstm_model = [
    {{"layer_name": "LSTM", "units": 64}},
    {{"layer_name": "Dropout", "rate": 0.1}},
    {{"layer_name": "LSTM", "units": 128}},
    {{"layer_name": "Dropout", "rate": 0.1}},
]


def custom_layer(input_layer):
    layer_str = ""
    for i in range(len(input_layer)):
        if input_layer[i]["layer_name"] == "Conv1D":
            filters = input_layer[i]["filters"]
            kernel_size = input_layer[i]["kernel_size"]
            layer_str += f"model.add(Conv1D(filters={{filters}}, kernel_size={{kernel_size}}, activation='relu'))"
        elif input_layer[i]["layer_name"] == "MaxPooling1D":
            pool_size = input_layer[i]["pool_size"]
            layer_str += f"model.add(MaxPooling1D(pool_size={{pool_size}}))"
        elif input_layer[i]["layer_name"] == "AveragePooling1D":
            pool_size = input_layer[i]["pool_size"]
            layer_str += f"model.add(AveragePooling1D(pool_size={{pool_size}}))"
        elif input_layer[i]["layer_name"] == "LSTM":
            units = input_layer[i]["units"]
            layer_str += f"model.add(LSTM(units={{units}}))"
        elif input_layer[i]["layer_name"] == "Dropout":
            rate = input_layer[i]["rate"]
            layer_str += f"model.add(Dropout(rate={{rate}}))"
        if i == 0:
            layer_str = layer_str.rstrip(")")
            if input_layer[i]["layer_name"] == "LSTM":
                layer_str += ", return_sequences=True"
            layer_str += ", input_shape=(x_train.shape[1], x_train.shape[2])))"
        layer_str += "\\n"

    return layer_str


adam = Adam(lr=0.003)

file_path = f"./tf_model.h5"
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

plt.plot(history.history['loss'], label='train')
plt.plot(history.history['val_loss'], label='test')
plt.legend()
plt.show()"""

    return code_str


def tf_custom_model_training_code(input_layer):
    code_str = f"""default_cnn_model = [
    {{"layer_name": "Conv1D", "filters": 64, "kernel_size": 2}},
    {{"layer_name": "MaxPooling1D", "pool_size": 2}},
    {{"layer_name": "Conv1D", "filters": 64, "kernel_size": 2}},
    {{"layer_name": "AveragePooling1D", "pool_size": 2}},
]


def custom_layer(input_layer):
    layer_str = ""
    for i in range(len(input_layer)):
        if input_layer[i]["layer_name"] == "Conv1D":
            filters = input_layer[i]["filters"]
            kernel_size = input_layer[i]["kernel_size"]
            layer_str += f"model.add(Conv1D(filters={{filters}}, kernel_size={{kernel_size}}, activation='relu'))"
        elif input_layer[i]["layer_name"] == "MaxPooling1D":
            pool_size = input_layer[i]["pool_size"]
            layer_str += f"model.add(MaxPooling1D(pool_size={{pool_size}}))"
        elif input_layer[i]["layer_name"] == "AveragePooling1D":
            pool_size = input_layer[i]["pool_size"]
            layer_str += f"model.add(AveragePooling1D(pool_size={{pool_size}}))"
        elif input_layer[i]["layer_name"] == "LSTM":
            units = input_layer[i]["units"]
            layer_str += f"model.add(LSTM(units={{units}}))"
        elif input_layer[i]["layer_name"] == "Dropout":
            rate = input_layer[i]["rate"]
            layer_str += f"model.add(Dropout(rate={{rate}}))"
        if i == 0:
            layer_str = layer_str.rstrip(")")
            if input_layer[i]["layer_name"] == "LSTM":
                layer_str += ", return_sequences=True"
            layer_str += ", input_shape=(x_train.shape[1], x_train.shape[2])))"
        layer_str += "\\n"

    return layer_str


input_layer = {input_layer}
adam = Adam(lr=0.003)

file_path = f"./tf_model.h5"
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

plt.plot(history.history['loss'], label='train')
plt.plot(history.history['val_loss'], label='test')
plt.legend()
plt.show()"""

    return code_str


def tf_model_evaluate_code():
    code_str = f"""trained_model = load_model("./tf_model.h5")
train_evaluate = trained_model.predict(x_train)
test_evaluate = trained_model.predict(x_test)

actual = y_data
plt.figure(figsize=(20,10))

plt.plot(scaler.inverse_transform(actual.reshape(-1,1)), label="Actual")
plt.plot(scaler.inverse_transform(train_evaluate), label="Train", alpha=0.8)
plt.plot(np.linspace(len(train_evaluate),len(train_evaluate) + len(test_evaluate), len(test_evaluate)), scaler.inverse_transform(test_evaluate), label="Test", color='orange', alpha=0.8)
plt.legend(fontsize="xx-large")"""

    return code_str


def tf_model_predict_code(period):
    code_str = f"""callback_checkpoint = ModelCheckpoint(
    filepath="./tf_model.h5", monitor="val_loss", save_best_only=True, save_weights_only=False
)
early_stopping = EarlyStopping(monitor="val_loss", patience=20, verbose=1)
reduce_lr = ReduceLROnPlateau(monitor="val_loss", factor=0.3, patience=5, min_lr=0.0009)
callbacks = [early_stopping, callback_checkpoint, reduce_lr]

x_future = x_test
y_future = y_test

for i in range(1, {period} + 1):
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
        trained_model = load_model('./tf_model.h5')

plt.figure(figsize=(20,10))

plt.plot(scaler.inverse_transform(actual.reshape(-1,1)), label="Actual")
plt.plot(scaler.inverse_transform(train_evaluate), label="Train", alpha=0.8)
plt.plot(np.linspace(len(train_evaluate),len(train_evaluate) + len(test_evaluate), len(test_evaluate)), scaler.inverse_transform(test_evaluate), label="Test", color='orange', alpha=0.8)
plt.plot(np.linspace(len(actual), len(actual) + len(y_future[-{period}:]), len(y_future[-{period}:])), scaler.inverse_transform(y_future[-{period}:].reshape(-1, 1)), label="future", alpha=0.8)
plt.legend(fontsize="xx-large")"""

    return code_str
