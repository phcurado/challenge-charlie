up: # Start app
	docker-compose up

up-build: # Build app
	docker-compose up --build

down: # Stop app
	docker-compose down

build-prod:
    docker build . -t desafio-charlie