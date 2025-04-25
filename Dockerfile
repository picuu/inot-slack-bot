FROM node:22.14.0

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

CMD [ "bash", "/inot-slack-bot/start.sh"]