# Build (or rebuild) using
# docker build - < Dockerfile NOT USED
#docker build -t="jeffdavisco/intranetlinkchecker:latest" .

# Pull base image.
FROM ubuntu

# maintainer details
MAINTAINER Jeff Davis "jeffdavisco@gmail.com"

# Install Python.
RUN \
  apt-get update && \
  apt-get install -y curl git python python-dev python-pip python-virtualenv && \
  rm -rf /var/lib/apt/lists/*

# Define working directory.
WORKDIR /data

# attach volumes
VOLUME /volume/git

# create working directory
RUN mkdir -p /local/git 
WORKDIR /local/git/

# Install the test webapp
RUN git clone https://github.com/dajevu/intranetlinkchecker/
WORKDIR /local/git/intranetlinkchecker

#RUN chmod +x /local/git/intranetlinkchecker/run.sh
# run startup script

#CMD ["run.sh"]

# Define default command.
CMD ["bash"]

