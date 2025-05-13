# Instagram Live Monitor

## Project Overview

This project allows simultaneous authentication of multiple Instagram accounts to discover and fetch active live video streams. It stores stream metadata in MongoDB and notifies a React front-end in real time via Socket.IO.

## Architecture

- **client/**: React (TypeScript) front-end with Tailwind CSS and Socket.IO-client.
- **server/**: Express (TypeScript) back-end using `instagram-private-api`, Socket.IO, Mongoose for MongoDB.
- **docker-compose.yml**: Orchestrates server, client, and MongoDB.

## Prerequisites

- Node.js v18+
- Docker & Docker Compose

## Environment Variables

See `.env.example` for required variables.

## Setup

1. Clone the repo
2. Copy `.env.example` to `.env` and fill values
3. Run:

   ```powershell
   docker-compose up --build
   ```

## Development

```powershell
# Server
cd server
npm install
npm run dev

# Client
cd client
npm install
npm run dev
```

## Testing

```powershell
cd server
npm test

cd client
npm test
```

## Docker Deployment

```powershell
docker-compose up --build
```
