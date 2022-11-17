#!/bin/sh

npm i

npm run db:migration:up
npm run db:seed

npm run dev
