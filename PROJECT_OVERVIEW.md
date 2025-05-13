# Project Overview

## Summary
This project is an Instagram Live Monitor that authenticates multiple Instagram accounts, fetches active live streams, and notifies a React front-end in real-time using Socket.IO.

## Folder Structure
```
server/
  ├── src/
  │   ├── app.ts
  │   ├── config.ts
  │   ├── controllers/
  │   ├── models/
  │   ├── routes/
  │   ├── services/
  │   ├── types/
  │   ├── utils/
  ├── Dockerfile
  ├── package.json
  ├── tsconfig.json
  ├── jest.config.js
  ├── .eslintrc.cjs
  ├── eslint.config.js

client/
  ├── src/
  │   ├── api.ts
  │   ├── App.tsx
  │   ├── index.css
  │   ├── main.tsx
  │   ├── pages/
  │   ├── services/
  ├── Dockerfile
  ├── package.json
  ├── tsconfig.json
  ├── vite.config.ts

.env
.env.example
README.md
docker-compose.yml
```

## Key Interfaces

### IAccount
```ts
export interface IAccount extends Document {
  username: string;
  session: Record<string, any>;
  lastLogin: Date;
}
```

### IStream
```ts
export interface IStream extends Document {
  account: string;
  igStreamId: string;
  title?: string;
  startTime: Date;
  viewerCount: number;
  streamUrl: string;
  isActive: boolean;
}
```

## Architectural Notes
- **Retry/Back-off**: `p-limit` is used to control concurrency.
- **Error Handling**: Centralized error handling with `errorHandler` middleware.
- **Test Framework**: Jest is configured for both server and client.
- **Real-time Updates**: Socket.IO is used for real-time notifications.
- **Environment Management**: `.env` file for configuration.
