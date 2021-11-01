start-docker:
	systemctl start docker
compose-up: compose-down
	docker-compose -f "docker-compose.yml" up -d --build
compose-down: 
	docker-compose -f "docker-compose.yml" down || make start-docker