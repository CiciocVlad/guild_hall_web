# Crafting Guild Hall Web Frontend

To run your frontend:

- Install dependencies with: `npm install`
- Pull the [backend](https://github.com/crafting-software/crafters_guild_hall_api) code and start it (else you'll get a lot of errors)
- Start your app in dev mode: `npm run dev`, or:
  - local non-dev mode (using the local backend): `npm run build-local-staging && npm run serve`
  - staging mode (using the staging backend): `npm run build-staging && npm run serve`
  - production mode (using the production backend): `npm run build-production && npm run serve`
