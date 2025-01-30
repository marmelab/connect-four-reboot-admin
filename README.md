# connect-four-reboot-admin

Connect-four-reboot game administration using:

- react-admin as a frontEnd typescript app
- postgrest with Supabase, an opensource Firebase alternative.

To run connect-four-reboot-admin, you have to run the both components.

## Run the connect-four-reboot-admin api (postrgrest)

Copy the .env.sample file to create your development environment file .env: if you use default configs, you just have to put your supabase anon key.

Then run:

```sh
make run
```

Supbase start with a populate, ready to use database.

If you want go into details, you have several goals in the makefile related to supabase. Please see [the makefile](makefile).

## Installation connect-four-reboot-admin frontend

Install the react-admin application dependencies by running:

```sh
make install
```

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
