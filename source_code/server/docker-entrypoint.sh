#!/bin/sh

npm i
npm run dev

npm run db:migration:up
npm run db:seed
