# Dockerfile for React client
FROM node:18-alpine as builder
WORKDIR /usr/src/app
# Ensure package.json exists in the build context
COPY ./package.json ./
# Ensure package.json is copied before running npm install
COPY package.json ./
COPY package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /usr/src/app
# Ensure package.json and lockfile are present for runtime scripts
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/package-lock.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 3001
CMD ["npm", "run", "serve"]
