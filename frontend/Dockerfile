FROM node:14.17.1
WORKDIR /app
COPY ./package.json ./
RUN ls -al
RUN npm i
COPY . .
CMD ["npm", "run", "start"]
