#!/bin/bash

echo -e "[INFO] Starting the script...\n"
echo -e "[INFO] Checking environment variables...\n"

# We give permissions to execute the script
chmod +x var_check.sh

# Exec the script to check the environment variables
./var_check.sh

echo -e "[INFO] Environment variables are successful.\n"

echo -e "[INFO] Logging to GitHub via GH CLI.\n"

# Declares the GH_TOKEN environment variable
GH_TOKEN=$(echo $GH_TOKEN_ENV 2>/dev/null)

# Creates a file with the GH_TOKEN
echo $GH_TOKEN >> mytoken.txt

# Sets github auth with PAT
gh auth login --with-token  < mytoken.txt
rm mytoken.txt

echo -e "[INFO] Logging successful.\n"

# Install the gh-webhook extension
if gh extension list | grep -q "cli/gh-webhook"; then
    echo -e "[INFO] gh-webhook extension is installed.\n"
else
    echo -e "[INFO] gh-webhook extension is not installed. Installing...\n"
    gh extension install cli/gh-webhook
fi

echo -e "[INFO] Starting apps...\n"

yarn start:api &

# Set variables for the webhook
ORG_NAME="Inot-Org"
WEBHOOK_EVENTS="repository,pull_request"

while [ "true" = "true" ]; do
  # Forwards the webhook events to our API
  gh webhook forward --org=$ORG_NAME --events=$WEBHOOK_EVENTS --url="http://localhost:5000/webhook" &
  # Wait for the webhook forward process to finish
  wait
done

wait
