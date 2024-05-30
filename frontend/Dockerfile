FROM "node:21-alpine3.18"

WORKDIR '/app/frontend'

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm","run","dev" ]
