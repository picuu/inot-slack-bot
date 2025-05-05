#!/bin/bash

function check_env_var() {

      if [[ -z $GH_TOKEN_ENV ]]; then
            echo "[ERROR] \$GH_TOKEN is empty"
            echo -e "\tPlease set the GH_TOKEN environment variable"
            exit 1
      fi
      if [[ -z $GH_ORG ]]; then
            echo "[ERROR] \$GH_ORG is empty"
            echo -e "\tPlease set the GH_ORG environment variable"
            exit 1
      fi
      if [[ -z $SLACK_CLIENT_ID ]]; then
            echo "[ERROR] \$SLACK_CLIENT_ID is empty"
            echo -e "\tPlease set the SLACK_CLIENT_ID environment variable"
            exit 1
      fi
      if [[ -z $SLACK_CLIENT_SECRET ]]; then
            echo "[ERROR] \$SLACK_CLIENT_SECRET is empty"
            echo -e "\tPlease set the SLACK_CLIENT_SECRET environment variable"
            exit 1
      fi
      if [[ -z $SLACK_SIGNING_SECRET ]]; then
            echo "[ERROR] \$SLACK_SIGNING_SECRET is empty"
            echo -e "\tPlease set the SLACK_SIGNING_SECRET environment variable"
            exit 1
      fi      
      if [[ -z $SLACK_APP_TOKEN ]]; then
            echo "[ERROR] \$SLACK_APP_TOKEN is empty"
            echo -e "\tPlease set the SLACK_APP_TOKEN environment variable"
            exit 1
      fi    
      if [[ -z $SLACK_BOT_TOKEN ]]; then
            echo "[ERROR] \$SLACK_BOT_TOKEN is empty"
            echo -e "\tPlease set the SLACK_BOT_TOKEN environment variable"
            exit 1
      fi          
      if [[ -z $SPAM_CHANNEL_ID ]]; then
            echo "[ERROR] \$SPAM_CHANNEL_ID is empty"
            echo -e "\tPlease set the SPAM_CHANNEL_ID environment variable"
            exit 1
      fi      
      if [[ -z $REDIS_URL ]]; then
            echo "[ERROR] \$REDIS_URL is empty"
            echo -e "\tPlease set the REDIS_URL environment variable"
            exit 1
      fi      
}

check_env_var