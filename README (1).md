# 🧭 README

## CareerCompass

### Description

CareerCompass is a platform that helps job seekers to find the right company to work for. It provides a list of companies with their ratings and reviews. Users can also look for job advertisements and chat with an AI chatbot to get career advice.

### Key Functionalities

* Search and filter for companies
* Rating companies
* Look for job advertisments
* Chatting with AI chatbot
* Claiming company profile and editing company information
* Posting job advertisements

### Tech Stack

|                                                         TypeScript                                                         |                                              NextJS                                              |                                               NestJS                                              |                                                  MongoDB                                                 |                                                   Firebase                                                  |                                                                                 OpenAI                                                                                |
| :------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [![Typescript](https://github.com/get-icon/geticon/raw/master/icons/typescript-icon.svg)](https://www.typescriptlang.org/) | [![React](https://github.com/get-icon/geticon/raw/master/icons/nextjs.svg)](https://nextjs.org/) | [![NestJS](https://github.com/get-icon/geticon/raw/master/icons/nestjs.svg)](https://nestjs.com/) | [![MongoDB](https://github.com/get-icon/geticon/raw/master/icons/mongodb.svg)](https://www.mongodb.com/) | [![Firebase](https://github.com/get-icon/geticon/raw/master/icons/firebase.svg)](https://www.firebase.com/) | [![OpenAI](https://assets-global.website-files.com/5e6aa3e3f001fae105b8e1e7/63920ffe0f48f96db746221d\_open-ai-logo-8B9BFEDC26-seeklogo.com.png)](https://openai.com/) |

## Backend

### Installation

Run

```
npm install
```

in `backend` directory to build the server

### Development

Create a new file `.env` in `backend` directory and add the following content

```env
MONGODB_URI=mongodb+srv://<username>:<password>@careercompassdatabase.7a8bbng.mongodb.net/
OPENAI_API_KEY=
FINE_TUNE_MODEL=
```

Run

```
npm start
```

or

```
npm run start:dev
```

in `backend` directory to start the server on port 4000

### Build

Run

```
npm run build
```

in `backend` directory to build the server

## Frontend

### Installation

Run

```
npm install
```

in `frontend` directory to build the client

### Development

Create a new file `.env` in `frontend` directory and add the following content

```env
SECRET=
NEXTAUTH_URL=
NEXT_PUBLIC_SITE_URL=
GOOGLE_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
MONGODB_URI=
NEXT_PUBLIC_API_URL=
NODE_ENV=
FIREBASE_STORAGE_BUCKET=
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
```

Run

```
npm run dev
```

in `frontend` directory to start the client on port 3000

### Build

Run

```
npm run build
```

in `frontend` directory to build the client
