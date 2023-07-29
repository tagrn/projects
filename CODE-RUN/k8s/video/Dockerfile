FROM ubuntu:20.04
RUN apt update
RUN apt install -y ffmpeg
RUN apt install -y python3
RUN apt install -y python3-pip
RUN apt install -y nginx
RUN rm /etc/nginx/sites-enabled/default
COPY ./default /etc/nginx/sites-enabled/default
COPY ./sslkey/fullchain.pem fullchain.pem
COPY ./sslkey/privkey.pem privkey.pem
COPY ./index.html index.html
RUN service nginx restart
COPY ./requirements.txt requirements.txt
COPY ./.env .env
RUN pip3 install -r requirements.txt
COPY ./app .
EXPOSE 8002
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon", "off;"]
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002"]
RUN service nginx restart
