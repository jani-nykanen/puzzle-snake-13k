#!/bin/sh

mkdir temp
# Replace compiler.jar with the closure compiler path
java -jar compiler.jar lib src > temp/out.js
cp -r res temp
cp index_dist.html temp/index.html
cp style.css temp/style.css
cd temp
zip -r ../dist.zip ./*
cd ..
rm -rf temp
