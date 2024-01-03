FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build && npm prune --production


FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
ARG JWT_SECRET=default_value 
ENV JWT_SECRET=${JWT_SECRET}

EXPOSE 3000
ENTRYPOINT [ "node" ]
CMD [ "dist/main.js" ]