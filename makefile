include .env

.PHONY: help build

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

run-postgrest-docker:
	docker-compose --env-file .env -f docker-compose.yml up --build -d

run-ra-dev:
	npm run dev

connect-db:
	docker exec -it connect-four-reboot-admin-database-postgres-1 sh -c 'psql -U $(DATABASE_USER) -d $(DATABASE_NAME)'

create-db:
	docker exec -i connect-four-reboot-admin-database-postgres-1 sh -c 'psql -U $(DATABASE_USER) -c "CREATE DATABASE $(DATABASE_NAME);"'

drop-db:
	docker exec -i connect-four-reboot-admin-database-postgres-1 sh -c 'psql -U $(DATABASE_USER) -c "DROP DATABASE IF EXISTS $(DATABASE_NAME);"'

create-model:
	docker exec connect-four-reboot-admin-database-postgres-1 sh -c 'psql -U $(DATABASE_USER) -d $(DATABASE_NAME) -f /scripts/create_model.sql'