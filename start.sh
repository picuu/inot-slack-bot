#!/usr/bin/bash

# We give permissions to execute the script
chmod +x var_check.sh

# Exec the script to check the environment variables
./var_check.sh

# Declares the GH_TOKEN environment variable
GH_TOKEN=$(echo $GH_TOKEN_ENV)

# Creates a file with the GH_TOKEN
echo $GH_TOKEN >> mytoken.txt

# Sets github auth with PAT
gh auth login --with-token  < mytoken.txt
rm mytoken.txt

# Install the gh extension
gh extension install cli/gh-webhook

# EJECUTAR EL PROGRAMA

yarn start

# Reads the events from the file creted
WEBHOOK_EVENTS="repository,workflow_run,pull_request"

# Forwards the webhook events to our FLASk APP
gh webhook forward --org=Inot-Org --events=$WEBHOOK_EVENTS --url="http://127.0.0.1:5000/webhook" &
# Wait for the webhook forward process to finish
wait