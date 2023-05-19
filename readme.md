# Microservices with Docker

This project demonstrates a simple setup for running Node.js microservices using Docker and Docker Compose. The docker-compose.yml files in each service directory can be used to initialize services independently.

## Services

1. **User Service** - A simple Express.js application connected to a MongoDB database. This service handles operations related to users.

2. **Task Service** - Another Express.js application connected to a separate MongoDB database. This service handles operations related to tasks, and can communicate with the User Service.

## Getting Started


### Instructions

1. Clone the repository to your local machine.

    ```
    git clone https://github.com/hmsayar/microservice-demo.git
    ```

2. Navigate to the project directory.

    ```
    cd microservice-demo
    ```

3. Run Docker Compose to start the services.

    ```
    docker-compose up
    ```

    Use the `-d` flag to run the services in detached mode.

4. You can stop the services using the following command:

    ```
    docker-compose down
    ```

## API Endpoints

The User Service runs on port 3000 and the Task Service runs on port 3001. Here are some of the API endpoints you can try:

- **User Service**

  - `GET /users` - Retrieves all users.
  - `POST /users` - Creates a new user.
  - `GET /users/:id` - Retrieves a user by ID.
  - `GET /users/:id/tasks` - Retrieves tasks for a specific user.

- **Task Service**

  - `GET /tasks` - Retrieves all tasks.
  - `POST /tasks` - Creates a new task.

