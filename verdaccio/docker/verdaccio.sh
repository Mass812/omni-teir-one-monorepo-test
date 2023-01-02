#!/usr/bin/env sh



echo "Starting verdaccio in docker container..."

V_PATH=`pwd`/verdaccio; docker run -it --rm --name verdaccio \
  -p 4873:4873 \
  -v $V_PATH/config:/verdaccio/config \
  -v $V_PATH/storage:/verdaccio/storage \
  -v $V_PATH/plugins:/verdaccio/plugins \
  verdaccio/verdaccio
