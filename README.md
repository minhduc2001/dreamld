# Welcome to DreamLd!

This is a server component for a mobile application that helps babies sleep better.
Question: Many parents find it difficult to put the baby to sleep. According to child psychologists reading fairy tales is one of the best ways to solve the problem. In fact, new parents often have for new books, and read them every night, because they have a lot of other things to do Of course, there are several apps on the App Store (or Play Market) with audio books, but they want something more than a regular audiobook library. Dreamtales is reimagination of audio fairy tales app for children and their parents. The main aim of the project is getting unigue experience for parents and children. In general, It should be a highly customized, simple to use by children, and beautiful app.
Link design: [Dreamtales-app](https://www.behance.net/gallery/148878593/Dreamtales-app?tracking_source=search_projects%7CDreamtales)

# Init project

Clone branch develop: [https://github.com/minhduc2001/dreamld.git](https://github.com/minhduc2001/dreamld.git)
Base on : [https://github.com/minhduc2001/nest-base](https://github.com/minhduc2001/nest-base)

**Features**:

- filter exception
- log error to file, logger service
- query data with postgresql
- authentication, authorization, permission
- upload file with multer
- generic service
- using swagger ui, docker, queue
- payment momo, cancel overdue payment with redis

**Technology used**:

- NestJs
- Typeorm
- Postgres
- Redis
- Docker
- Swagger
- Husky(check format, type message pre push code)
- Git/Github

**Requirement**:

- Node version >= 16
- Docker
- Recomment yarn

**How to run**

1.  _Install dependences, touch .env_
    In root project:
    > $ yarn
    > or
    > $ npm install

> $ touch .env && cp .env.example .env

2.  _Init environment using docker_

Start docker (postgres, redis)

> $ docker compose up -d
> or
> $ yarn docker:up

Stop docker

> $ docker compose down
> or
> $ yarn docker:down

3.  _Run project_

Run with develop

> yarn start:dev

Run with product

> yarn start:prod

Build

> yarn build

Check lint

> yarn lint

Check prettier

> yarn prettier
> or
> yarn prettier:fix #if u need fix format code.

## Description
