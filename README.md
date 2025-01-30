# connect-four-reboot-admin

Connect-four-reboot game administration using:

- react-admin as a frontEnd typescript app
- postgrest inside a docker, as a standalone web server that turns a PostgreSQL database directly into a RESTful API.

To run connect-four-reboot-admin, you have to run the both components.

The postgrest docker-compose contains two dockers:

- postgres
- postgrest

## Run the connect-four-reboot-admin api (postrgrest)

Copy the .env.sample file to create your development environment file .env
You have to configure the port, the username and password for the postgrest configuration.

Then run:

```sh
make run-postgrest-docker
```

The docker start with an empty, ready to use, database.

You have to create the db tables runing:

```sh
make create-model
```

Next, you must generate fake data:

```sh
make populate-db
```

You can test the configuration runing:

```sh
make connect-db
```

If necessary, for dev purpose you have the ability to drop and recreate the
database with:

```sh
make drop-db
```

database with:

```sh
make create-db
```

tips:

```sh
make run
```

this goal do all for you.

## Installation connect-four-reboot-admin frontend

Install the react-admin application dependencies by running:

```sh
make install
```

## Development connect-four-reboot-admin frontend

Start the react-admin application in development mode by running:

```sh
make dev-ra
```

## Production connect-four-reboot-admin frontend

Build the react-admin application in production mode by running:

```sh
make build
```

## Misc

You have several make goals to improve the quality of the code:

```sh
make type-check
```

```sh
make lint
```

```sh
make format
```
