FROM node:lts-slim

RUN apt update -y && apt upgrade -y
RUN apt install -y git \
    ca-certificates \
    curl \
    wget \
    gh

WORKDIR /inot-slack-bot
COPY . .

RUN ls

RUN corepack enable && corepack install -g yarn@4.7.0
RUN yarn

# Expose ports for the bot (3000) and the web server (5000)
EXPOSE 3000
EXPOSE 5000

CMD [ "/bin/bash", "/inot-slack-bot/start.sh"]
