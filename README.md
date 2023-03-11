## Run Docker Compose from root folder - ensure docker is installed
`docker-compose up -d`

It will setup the hasura and postgresql on docker and you can access it via http://localhost:8080/console

Next step is setup and run Node Server

## Change from root directory to express-graphql-postgres folder
`cd express-graphql-postgres`

## Install dependencies
`npm install`

## Run the server either ways using DockerFile which will containerize the app or directly running on local serve.
`npm start`

or

`docker build -t my-app .`
`docker run -p 4000:4000 my-app`
