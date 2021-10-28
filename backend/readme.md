# backend

> Escape Room Webservice

## Build Setup

```bash
# install dependencies
npm install
```
## require files (should make)
backend/db_config.json,  backend/.env

at db_config.json
```bash
{
  host : { your db host name },
  user : { your db user name },
  password : { your db password },
  database : { your db name },
  port : { your port number, maybe 3306 }
}
```

at .env
```bash
COOKIE_SECRET={ someting }
```
## db table create, insert dummy data (at backend path)
```bash
npx knex migrate:up 20211014062106_add-tables.js
npx knex migrate:up 20211014073236_insert_dummy_data.js
```

```bash
#service start
npm start
```
we used aws to publish our website
at aws, we used pm2 and nginx

