#!/bin/sh
# Replace compiler.jar with the closure compiler path
java -jar compiler.jar lib src > out.js
