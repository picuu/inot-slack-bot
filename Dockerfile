FROM ubuntu:latest

# Install Some Tools that we are going to need
RUN apt-get update && apt-get -y install \
    openssh-client \
    git \
    ca-certificates \
    curl \
    wget \
    apt-transport-https \
    software-properties-common \
    python3-pip \
    python-is-python3 \
    python3-venv \
    python3-full \
    gh


# copy the entire directory scripts
WORKDIR /app
COPY . .

# Activate the virtual environment and install dependencies
RUN python -m venv venv

# Install pip packages inside the virtual environment by directly using the venv's pip
RUN /app/venv/bin/pip install --upgrade pip && \
    /app/venv/bin/pip install -r requirements.txt

# Define the path to access the package in the virtual environment
ENV PATH="/app/venv/bin:$PATH"

# Install dependencies in the virtual environment
RUN /app/venv/bin/pip install -r /app/requirements.txt

# FLASk APP to enviroment variable

ENV FLASK_APP=/app/flask_app.py

# Entry point for the container
CMD [ "bash", "/start.sh"]