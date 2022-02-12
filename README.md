# wrkout (WIP) - a web based fitness app for creating, performing and tracking workouts

## Built with

- Python (FastAPI, postgres with SQLAlchemy)
- Vue.js (Vite, Quasar, Pinia)

### Demo: https://wrkout1.netlify.app/
Frontend hosted on Netlify, backend hosted on Heroku, using Heroku Postgres.

## About the project

wrkout aims to be an useful workout companion app, allowing the user to create workout routines and perform them set by set, all while tracking the user's progress over time and providing useful visual overviews of the data gathered from workout routines.

The project explores modern Vue 3 development using Vite and Pinia for state management. Endpoints are served by FastAPI, which plays well together with SQLAlchemy(postgres) and authentication is handled using JWT.


## How to run locally

Install frontend dependencies and run dev server:
```
npm install
npm run dev
```

Note that this is the frontend repo, you can find the backend repo [here.](https://github.com/sqmch/wrkout_back)
