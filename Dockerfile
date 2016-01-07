# Build (or rebuild) using
# docker build -t="jeffdavisco/polymer-python:latest" .

# Pull base image.
FROM ubuntu

# maintainer details
MAINTAINER Jeff Davis "jeffdavisco@gmail.com"

# Install Python.
RUN \
  apt-get update && \
  apt-get install -y git python python-dev python-pip python-virtualenv && \
  rm -rf /var/lib/apt/lists/*

# Define working directory.
WORKDIR /data

# attach volumes
VOLUME /volume/git

# create working directory
RUN mkdir -p /local/git 
WORKDIR /local/git/

# Install the test webapp
RUN git clone https://github.com/dajevu/docker-python
WORKDIR /local/git/docker-python

#RUN chmod +x /local/git/docker-python/run.sh
# run startup script

#CMD ["run.sh"]

# Define default command.
CMD ["bash"]

