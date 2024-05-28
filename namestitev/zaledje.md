---
description: Navodila za vzpostavitev zaledja aplikacije.
---

# 🌚 Zaledje

## Predpogoji za uspešno namestitev

* Nameščen [Node.js](https://nodejs.org/en).
* Kloniran projekt iz [GitHub repozitorija](https://github.com/mtoplak/CareerCompass).

***

## Vzpostavitev zaledja

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
