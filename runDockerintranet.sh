
docker run -d -e VMHOST=192.168.99.100 --name intranetlinker -p 8010:8010 jeffdavisco/intranetlinkchecker:latest /local/git/ntranetlinkchecker/run.sh

# once running you can identify the IP addr by using: boot2docker ip. Then, use that IP to access port 8080
