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
	make start-supabase && make supabase-migrate-database && make run-ra-dev

stop: ## stop the docker
	make stop-supabase

## Supabase (postrgrest / postgres)
###################################

start-supabase: ## start supabase locally
	npx supabase start

stop-supabase: ## stop supabase locally
	npx supabase stop

supabase-migrate-database: ## apply the migrations to the database
	npx supabase migration up

supabase-reset-database: ## reset (and clear!) the database
	npx supabase db reset

supabase-populate: ## populate database with fake values
	npx tsx tools/populateDbWithFakeData.ts

supabase-connect: ## connect into the supabase postgres docker.
	docker exec -it ${SUPABASE_DOCKER_NAME} sh -c 'psql -U $(SUPABASE_USER) -d $(SUPABASE_DBNAME)'


## Dev quality
##############

type-check: ## verifying types validity
	npm run type-check

lint:  ## run linter
	npm run lint 

format: ## run prettier
	npm run format

