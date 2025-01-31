# connect-four-reboot-admin

Connect-four-reboot game administration using:

- react-admin as a frontEnd typescript app
- postgrest with Supabase, an opensource Firebase alternative.

To run connect-four-reboot-admin, you have to run the both components.

## Run the connect-four-reboot-admin api (postrgrest)

First install the app with :

```sh
make install
```

Then, copy the .env.sample file to create your development environment file .env.

Now run:

```sh
make run
```

This command will start both components:

- Supbase with a populated, ready to use database
- react-admin front end vite server

If you want go into details, you have several goals in the makefile related to supabase. Please see [the makefile](makefile).

## Development connect-four-reboot-admin frontend

Start the react-admin application in development mode by running:

```sh
make run-ra-dev
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
