FROM node:latest
WORKDIR /srv/app
COPY package*.json ./
RUN yarn
COPY . .
EXPOSE 3000

RUN yarn run build
CMD ["node", "index.js"]