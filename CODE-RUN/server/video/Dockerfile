FROM ubuntu:20.04
RUN apt update
RUN apt install -y ffmpeg
RUN apt install -y python3
RUN apt install -y python3-pip
COPY ./requirements.txt requirements.txt
COPY ./.env .env
RUN pip3 install -r requirements.txt
COPY ./app .
EXPOSE 8002
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002"]
