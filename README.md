
## Description

This project provides a text justification Api which uses a mechanism of authentication via a unique token, Each token has a daily rate limit that does not exceed 80,000 words and the maximum line length of the text after justification is fixed to 80 characters.
This project is built using nestJs, deployed on google cloud and uses CI/CD pipelines through github workflows.

## Endpoints and documentation:

- Project root url: https://text-justification-service-qb5s7tdy2a-uc.a.run.app
- Project Documentation: https://text-justification-service-qb5s7tdy2a-uc.a.run.app/docs

## Prerequisites
  ### Run locally without docker image
    NodeJs
    NestJs
  ### Run locally with docker image
    Docker
## Environement variables
### without docker: 
- Add .env file in root folder that contains this variable: JWT_SECRET=jwtSecretExample
### with docker: 
- Environment JWT_SECRET variable is set to default_value when runnig docker locally so no need for a .env file
##### INFO:
    the env variable JWT_SECRET is set through github secrets when deploying the app.
 
## Running the app
### Without docker
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
### With docker image
- Create image with example name "image-name"
    ```bash
    $ docker build . -t image-name
    ```
- Build image with the name that we provided to the docker build command and bind the continer port 3000 to our local machine port (port 3000 in our example)
    ```bash
     $ docker run -d -p3000:3000 image-name:latest
    ```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
