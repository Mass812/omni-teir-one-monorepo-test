#!/usr/bin/env sh

# This script is used to publish a local version of the package to the local registry.
npx lerna exec npm publish --registry "https://npm.pkg.github.com/@mass812" 


echo 'publish_local_version_to_registry.sh: Done.'