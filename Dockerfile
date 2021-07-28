FROM node:12-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./

RUN yarn
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "node", "dist/main" ]