#!/usr/bin/env sh

echo "Starting verdaccio in docker container..."

V_PATH=`pwd`/verdaccio; docker run -it --rm --name verdaccio \
  -p 4873:4873 \
  -v $V_PATH/config:/verdaccio/config \
  -v $V_PATH/storage:/verdaccio/storage \
  -v $V_PATH/plugins:/verdaccio/plugins \
  verdaccio/verdaccio

echo "Verdaccio is running in docker container:"
echo " @ http://localhost:4873"
echo " @ http://$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' verdaccio):4873"
