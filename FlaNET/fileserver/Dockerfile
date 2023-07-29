FROM python:3.8
COPY ./requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY ./app .
EXPOSE 8003
CMD ["python3", "main.py"]