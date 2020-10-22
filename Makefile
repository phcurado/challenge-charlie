include makefiles/variables.mk

up: # Start app
	docker-compose up -d

up-bing: # Start app
	docker-compose up -d $(BING)

up-build: # Build app
	docker-compose up -d --build

down: # Stop app
	docker-compose down

logs: # Tail the service container's logs
	docker-compose logs -tf --tail 100 $(FRONT)

build-prod: # Build the production image
	docker build . -t desafio