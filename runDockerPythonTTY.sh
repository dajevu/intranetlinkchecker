
docker run -t -i -e VMHOST=192.168.59.103 --name python -p 8000:8000 --link tomcat-maven:tomcat-maven --rm jeffdavisco/polymer-python:latest

# once running you can identify the IP addr by using: boot2docker ip. Then, use that IP to access port 8080
