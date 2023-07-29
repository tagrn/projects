FROM python:3.8
COPY ./requirements.txt requirements.txt
COPY ./.env .env
RUN pip3 install -r requirements.txt
COPY ./app .
EXPOSE 8001
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]