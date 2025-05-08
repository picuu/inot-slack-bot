FROM node:lts-slim

RUN apt update -y && apt upgrade -y
RUN apt install -y git \
    ca-certificates \
    curl \
    wget

RUN (type -p wget >/dev/null || (apt update && apt-get install wget -y)) \
    && mkdir -p -m 755 /etc/apt/keyrings \
    && out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
    && cat $out | tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
    && chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt update \
    && apt install gh -y

WORKDIR /inot-slack-bot
COPY . .

RUN ls

RUN corepack enable && corepack install -g yarn@4.7.0
RUN yarn

# Expose ports for the bot (3000) and the web server (5000)
EXPOSE 3000
EXPOSE 5000

CMD [ "/bin/bash", "/inot-slack-bot/start.sh"]
