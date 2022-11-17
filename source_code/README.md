## To run the project

### Prerequisites

- [docker](https://www.docker.com/products/docker-desktop/)
- [local environment variables](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa) (add the `.env` file to the root of the project following the example set in `.env.example`)

### Run the command

```cmd
$ docker compose up
```

</br></br></br>

## Development instructions

### Prerequisites

- [node](https://nodejs.org/en/download/) ~v18
- [docker](https://www.docker.com/products/docker-desktop/)
- [local environment variables](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa) (add the `.env` file to the root of the project following the example set in `.env.example`)

### Run the commands

```cmd
$ npm install && (cd server && npm install) && (cd client && npm install)
```

```cmd
$ docker compose up
```

### To install/uninstall a package

**Stop local server!**

```cmd
$ cd server    // or client
$ npm install package-name
$ npm uninstall package-name
```

### Run migrations and seeders

Docker container needs to be running!

```cmd
cd server
npm db:migration:up
npm db:seed
```

### Working with migrations and seeders

```cmd
cd server

npm db:migrations:create <name>   // creates a new file in src/shared/database/migrations(look at current migrations for reference)
npm db:seed:create <name>         // creates a new file in src/shared/database/seeders (look at current seeders for reference)

npm db:migration:undo             // reverts the last migration run
npm db:migration:down             // reverts all the migrations
npm db:seed:undo                  // reverts the last seeder run
npm db:seed:undo:all              // reverts all the seeders
```

## Extensions, settings...

### Extensions

- Prettier ([link](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))
- Editor config ([link](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig))
- Vue Language Features (Volar) ([link](https://marketplace.visualstudio.com/items?itemName=Vue.volar))

### Settings

- format on save (watch out not to save files you haven't changed as to not change the formatting and bring PR mess)

### Important note

Running the project without docker will not be possible because the project doesn't use `dotenv` or other such packages. It can be added in the future if needed.

### Debugging (🚧 working on it)

_You can try this but it's not working consistently because vscode is outside the docker container and doesn't recognise the source maps in every single file..._
<br/><br/>
Add the following config to `source_code/.vscode/launch.json`

```json
{
  "configurations": [
    {
      "name": "Attach to Node in Docker",
      "type": "node",
      "address": "localhost",
      "port": 9229,
      "request": "attach",
      "restart": true
    }
  ]
}
```

## Deployment

Auto deploy on master changes - redeploys only the part that changed (either client or server or both)
Render.yaml file - infrastructure as code / blueprints
Seeding and migrating through shell
Through shell on server create .tmp/images for profile image storage
Add .env file for backend and VITE_SERVER_URL with server prod link
