#!/bin/bash

# create self-signed certificates
mkdir -p keys
openssl req -x509 -out keys/localhost.crt -keyout keys/localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost:8088' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost:8088\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost:8088\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
