#!/usr/bin/bash

PARSED_EVENTS_FILE_PATH=/etc/PARSED_EVENTS
FILES_FOLDER=/etc/diff_files/
TABLES_FILE_FOLDER=/etc/tables/

# We give permissions to execute the script
cd start && chmod +x var_check.sh

# Exec the script to check the environment variables
./var_check.sh

# Declares the GH_TOKEN environment variable
GH_TOKEN=$(echo $GH_TOKEN_ENV)

# Creates the files folder for Pull request files
mkdir -m 700 $FILES_FOLDER

# Creates the files folder for tables files
mkdir -m 700 $TABLES_FILE_FOLDER

# Creates a file with the GH_TOKEN
echo $GH_TOKEN >> mytoken.txt

# Sets github auth with PAT
gh auth login --with-token  < mytoken.txt
rm mytoken.txt

# Install the gh extension
gh extension install cli/gh-webhook

# Set permissions for the APP (owner only)
chmod 700 -R /app

# Activates the virtual environment
source /app/venv/bin/activate

# Runs the app in the background
cd /app && python main.py & 

# Runs the script to get the webhook events
python3 -c "from get_data_configmap import get_data_from_configmap; get_data_from_configmap()"

# Reads the events from the file creted
WEBHOOK_EVENTS=$(cat $PARSED_EVENTS_FILE_PATH)

echo $OUTPUT_TYPE_MESSAGE_PR
# Forwards the webhook events to our FLASk APP
gh webhook forward --org=$GH_ORG --events=$WEBHOOK_EVENTS --url="http://127.0.0.1:5000/webhook" &

# Wait for the webhook forward process to finish
wait