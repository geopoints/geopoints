
# Geopoints

<p align="center"> 
  <img src="http://res.cloudinary.com/dlshfgwja/image/upload/v1675782008/bp1ynczax2kz0seqo3in.png" style="width:100px;height:auto;"/>
</p>



Geopoints is a mobile app that enables users to organize their favorite activities into lists and fill them with real locations that can be easily viewed on the map. Geopoints also comes with a social feature and offers an easy user interface for connecting with users around you.

## Screenshots

<p align="center">
  <img src="http://res.cloudinary.com/dlshfgwja/image/upload/v1676095248/xpnvvnlx69uqzaberdgf.png" style="width:40vw;height:auto;" />
</p>

[A small demo film](https://www.youtube.com/watch?v=DrTirxNFs0Y)

## Getting started

Except for the regular suspects; git, Node, npm, you need these things to work on the Geopoints app. Follow the instructions supplied below them or on their links to get them up and running before you continue with *Installation*.

* [PostgreSQL](https://www.postgresql.org/) - an object-relational database.

   Create a database in your machine or use a `URI` provided by services like [Supabase](https://supabase.com/).

* [Cloudinary](https://cloudinary.com/) - a cloud media storage.

   Create an account and get your `CLOUD NAME`.

* [Google Maps](https://console.cloud.google.com/getting-started)

   Create an account and get an `API KEY`.

* [Auth0](https://auth0.com/) - an authentication service.

    Create an app and follow [this guide](https://auth0.com/docs/quickstart/webapp/nextjs/01-login).

## Installation

1. Clone this repo and enter!

   ```bash
   git clone https://github.com/MateoPresaCastro/geopoints
   cd geopoints/geopoints/
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Add enviroment variables.

    Create a `.env` file in the inner geopoints folder and add your database connection string, e.g:

    ```bash
    DATABASE_URL="postgres://[username]:[password]@[host]:[port]/[dbname]"
    ```

    Add the rest of enviroment variables to `.env.local` on the same folder. Don't forget to add all `Auth0` variables.

    ```bash
    NEXT_PUBLIC_BACKEND_HOST="http://localhost:3000"
    NEXT_PUBLIC_API_KEY="Your Google API key"
    AUTH0_SECRET=""
    AUTH0_BASE_URL="http://localhost:3000"
    AUTH0_ISSUER_BASE_URL=""
    AUTH0_CLIENT_ID=""
    AUTH0_CLIENT_SECRET=""
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="Your cloudinary cloud name"
    NEXT_PUBLIC_DEFAULT_IMAGE="http://res.cloudinary.com/dlshfgwja/image/upload/v1675782008/bp1ynczax2kz0seqo3in.png"
    NEXT_PUBLIC_DEFAULT_MARKER_USER_LOCATION="https://image.pngaaa.com/328/1509328-middle.png"
    ```

4. While in the geopoints folder, run this command. It pushes the prisma schema into your database and seeds data.

    ```bash
    npx prisma db push && npx prisma db seed
    ```

5. Run `npm run dev` and open your browser pointing to `http://localhost:3000/welcome`.

6. Click on the `Get started` button and login.

7. Accept your browser's request to track your location and change your system preferences if neccesary.

8. Enjoy!

## Tech Stack

* React
* Next.js
* React Query
* Prisma
* PostgreSQL
* Google Maps API
* TypeScript
* Auth0
* Tailwind CSS
* Material Tailwind
* Cloudinary

## Developers

* Mateo Presa - [GitHub](https://github.com/MateoPresaCastro) - [LinkedIn](https://www.linkedin.com/in/mateopresa/)
* Dominic Bolton - [GitHub](https://github.com/dombolton1) - [LinkedIn](https://www.linkedin.com/in/dominic-bolton-368608173/)
* Mark Kagan - [GitHub](https://github.com/MarkKagan) - [LinkedIn](https://www.linkedin.com/in/mark-kagan/)
* Karl Fredriksson - [GitHub](https://github.com/mothugget) - [LinkedIn](https://www.linkedin.com/in/karl-p-a-fredriksson/)


