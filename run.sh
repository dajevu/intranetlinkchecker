#!/bin/bash

echo `env`

git pull

python -m SimpleHTTPServer 8010
