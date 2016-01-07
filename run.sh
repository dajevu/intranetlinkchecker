#!/bin/bash

echo `env`

git pull

# replace placeholder with actual docker host
sed -i "s/VMHOST/$VMHOST/g" post-service/post-service.html

python -m SimpleHTTPServer 8010
