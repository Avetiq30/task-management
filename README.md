<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Task Management API

## Description
This project is an API for task management developed using NestJS and PostgreSQL. The project is containerized using Docker Compose and includes unit tests.

## Requirements
- Docker
- Docker Compose

## Technology Stack

- **Backend:** NestJS
- **Database:** PostgreSQL
- **Containerization:** Docker
- **Testing:** Jest

## Installation

1. Clone the repository:
    ```shell
    git clone https://github.com/yourusername/task-management-api.git
    ```
2. Navigate to the project directory:
    ```shell
    cd task-management
    ```

3.  In the root of the project, create a .env file with the following parameters.
```
   # Database settings
   DATABASE_HOST=db
   DATABASE_PORT=5432
   DATABASE_USER=task
   DATABASE_PASSWORD=password
   DATABASE_NAME=task_db
   # Api
   PORT=4000
```

4. Build and run the containers using Docker Compose:
    ```shell
    docker-compose up --build
    ```

   This will start the application, PostgreSQL, and other required services.

## Testing
Run unit test 
```shell
docker-compose exec app npm run test
```


## API documentation with swagger
Open in browser this url for view api documentation 
```shell
http://localhost:4000/api/doc
```


## API

### Tasks

#### Get All Tasks

**GET** `/tasks`

Query Parameters:

- `page` (number) - page number for pagination
- `limit` (number) - number of tasks per page

**Response:**

Get Task by ID
GET /tasks/:id

Path Parameters: "id": 1,

id (number) - task ID
Response:
```json

{
    "id": 1,
    "title": "Finish homework",
    "description": "Finish math and science homework",
    "dueDate": "2024-09-15T12:00:00.000Z",
    "priority": "MEDIUM",
    "assignee": "Alice1",
    "status": "COMPLETE",
    "createdAt": "2024-09-10T12:12:49.714Z",
    "updatedAt": "2024-09-10T12:12:49.714Z"
}
```
Create Task
POST /tasks

Request Body:
```json

{
  "title": "Finish homework",
  "description": "Finish math and science homework",
  "dueDate": "2024-09-15T12:00:00Z",
  "priority": "MEDIUM",
  "assignee": "John Doe"
}

```
Response:
```json

{
    "id": 1,
    "title": "Finish homework",
    "description": "Finish math and science homework",
    "dueDate": "2024-09-15T12:00:00.000Z",
    "priority": "MEDIUM",
    "assignee": "Alice1",
    "status": "COMPLETE",
    "createdAt": "2024-09-10T12:12:49.714Z",
    "updatedAt": "2024-09-10T12:12:49.714Z"
}
```
Update Task
PUT /tasks/:id

Path Parameters:

id (number) - task ID
Request Body:
```json
{
  "title": "Start homework",
  "description": "Finish math and science homework",
  "dueDate": "2024-09-15T12:00:00Z",
  "priority": "MEDIUM",
  "assignee": "John Doe"
}
```
Response:
```json
{
    "id": 1,
    "title": "Start homework",
    "description": "Finish math and science homework",
    "dueDate": "2024-09-15T12:00:00.000Z",
    "priority": "MEDIUM",
    "assignee": "Alice1",
    "status": "COMPLETE",
    "createdAt": "2024-09-10T12:12:49.714Z",
    "updatedAt": "2024-09-10T12:12:49.714Z"
}
```
Reports
Get Completed Tasks by User
GET /reports/completed-by-user

Query Parameters:

assignee (string) - user's email
Response:

```json
[
    {
        "id": 1,
        "title": "Finish homework",
        "description": "Finish math and science homework",
        "dueDate": "2024-09-15T12:00:00.000Z",
        "priority": "MEDIUM",
        "assignee": "Alice1",
        "status": "COMPLETE",
        "createdAt": "2024-09-10T12:12:49.714Z",
        "updatedAt": "2024-09-10T12:12:49.714Z"
    }
]
```
Get Average Completion Time
GET /reports/average-completion-time

Response:

```json
{
    "averageCompletionTime": 0
}
```
