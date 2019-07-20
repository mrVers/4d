# VIDEOTEK4_

> A simple scraping API and web site for browsing videos from RTV. Made with Nest.js and Nuxt.js.

## Prerequisite

* Nodejs (with npm)
* Mongodb

## Build Setup

```bash
$ npm install
$ cp example.env .env

# In /site folder
$ npm install
```
Edit ".env" file for your setup.

## Running the API

```bash
# always have mongo db running in the background
$ mongod

# development
$ npm run serve

# build for production and launch server
$ npm run build
$ npm run start:prod
```

## Running the APP (/site folder)

``` bash
# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```
