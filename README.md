<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Task Management API

## Description

This project is an API for task management developed using NestJS and PostgreSQL. The project is containerized using Docker Compose and includes unit tests.

## Technology Stack

- **Backend:** NestJS
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose
- **Testing:** Jest

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/task-management-api.git
    ```

2. Navigate to the project directory:
    ```bash
    cd task-management
    ```

3. Build and run the containers using Docker Compose:
    ```bash
    docker-compose up --build
    ```

   This will start the application, PostgreSQL, and other required services.

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
```

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
```

{
  "title": "Finish homework",
  "description": "Finish math and science homework",
  "dueDate": "2024-09-15T12:00:00Z",
  "priority": "MEDIUM",
  "assignee": "John Doe"
}

```
Response:
```

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
```

{
  "title": "Start homework",
  "description": "Finish math and science homework",
  "dueDate": "2024-09-15T12:00:00Z",
  "priority": "MEDIUM",
  "assignee": "John Doe"
}
```
Response:
```

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

```
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

```
{=
{
    "averageCompletionTime": 0
}
```
Testing
To run unit tests, use the command: npm run test

docker-compose exec app npm run test
License
This project is licensed under the MIT License. See LICENSE for details.

Contact
For questions and suggestions, contact [your name or contact information].



Replace `yourusername` and contact information with your actual details. Adjust any comman
