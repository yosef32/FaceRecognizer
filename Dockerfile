FROM node as build-stage
WORKDIR /app
COPY ["package.json", "package-lock.json*",  "./"]
RUN npm install --silent
COPY . .
RUN npm run build

FROM node as production-stage
RUN mkdir /app
WORKDIR /app
COPY --from=build-stage /app .
EXPOSE 8000:8000
CMD ["npm", "run", "prod"]