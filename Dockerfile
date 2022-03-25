FROM node:lts-alpine

RUN apk update
RUN apk upgrade
RUN apk add curl ffmpeg

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

COPY deploy-commands.js ./

RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
RUN chmod a+rx /usr/local/bin/yt-dlp

RUN npm install
ENV NODE_ENV=production
RUN node ./deploy-commands.js


# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]