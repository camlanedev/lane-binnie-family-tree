FROM node:18-alpine

WORKDIR /lane-binnie-family-tree/

COPY public/ /lane-binnie-family-tree/public
COPY src/ /lane-binnie-family-tree/src
COPY package.json /lane-binnie-family-tree/

#COPY public/ /public
#COPY src/ /src
#COPY package.json /

RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
