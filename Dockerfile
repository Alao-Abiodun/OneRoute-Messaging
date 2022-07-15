FROM node:14

EXPOSE 1111

WORKDIR /app

RUN npm install i npm@latest -g

COPY package.json package-lock*.json ./

RUN npm  install 

RUN npm install db-migrate-pg

COPY . . 

RUN git clone https://github.com/vishnubob/wait-for-it.git

CMD ["npm", "run", "dev"]

