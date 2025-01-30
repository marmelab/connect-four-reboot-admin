include .env

.PHONY: help install

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

## Install - react-admin
########################

install: ## install NPM dependencies
	npm install

clear: ## Cleans up various build-related directories like dist, node_modules, and build for all apps
	npm run clear

build : ## build the react-admin server.
	npm run build

run-ra-dev: ## run the react-admin server.
	npm run dev

## Run
########

run: ## fresh run of all you need to use the app
	make stop-postgrest-docker && make run-postgrest-docker && make drop-db && make create-db && make create-model && make populate-db && make run-ra-dev

stop: ## stop the docker
	make stop-postgrest-docker

## Docker - postrgrest / postgres
#################################

run-postgrest-docker: ## run the postgrest docker-compose containing 2 dockers: postgres (db) & postgrest (api). The postgres docker start with a ready to use empty db.
	docker-compose --env-file .env -f docker-compose.yml up --build -d

stop-postgrest-docker: ## stop the postgrest docker-compose
	docker-compose --env-file .env -f docker-compose.yml down

## Database
###########

connect-db: ## connect into the postres docker.
	docker exec -it connect-four-reboot-admin-database-postgres-1 sh -c 'psql -U $(DATABASE_USER) -d $(DATABASE_NAME)'

create-db: ## initialize an empty ready to use db inside the docker - use it only after drop.
	docker exec -i connect-four-reboot-admin-database-postgres-1 sh -c 'psql -U $(DATABASE_USER) -c "CREATE DATABASE $(DATABASE_NAME);"'

drop-db: ## drop the postgres db inside the docker.
	docker exec -i connect-four-reboot-admin-database-postgres-1 sh -c \
'psql -U postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '\''connect_four_reboot_admin'\'';"' && docker exec -i connect-four-reboot-admin-database-postgres-1 sh -c 'psql -U $(DATABASE_USER) -c "DROP DATABASE IF EXISTS $(DATABASE_NAME);"'

create-model: ## create the connect-four-reboot-admin tables.
	docker exec connect-four-reboot-admin-database-postgres-1 sh -c 'psql -U $(DATABASE_USER) -d $(DATABASE_NAME) -f /scripts/create_model.sql'

populate-db: ## populate database with fake values
	npx tsx tools/populateDbWithFakeData.ts

## Dev quality
##############

type-check: ## verifying types validity
	npm run type-check

lint:  ## run linter
	npm run lint 

format: ## run prettier
	npm run format

