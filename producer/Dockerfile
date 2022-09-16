FROM python:3.10

WORKDIR /producer
COPY . .
RUN pip install -r requirements.txt

ENTRYPOINT [ "python" ]
CMD [ "main.py" ]