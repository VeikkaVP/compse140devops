# Service2 Dockerfile

FROM python:3.9-slim

WORKDIR /service2

# Install system dependencies
RUN apt-get update && apt-get install -y procps net-tools
# Install library dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 3333

# Start the Python app
CMD ["python", "veikkapython.py"]
