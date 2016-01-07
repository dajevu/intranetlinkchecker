
docker run -d -e VMHOST=192.168.59.103 --name python -p 8000:8000 --link tomcat-maven:tomcat jeffdavisco/polymer-python:latest /local/git/docker-python/run.sh

# once running you can identify the IP addr by using: boot2docker ip. Then, use that IP to access port 8080
