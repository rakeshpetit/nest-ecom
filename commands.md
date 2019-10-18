#Create new nest project
nest new nest-ecom

#Start mongodb docker container
1.docker container start 9884708960d9
2.Ensure mongodb is up and running

#Install mongoose and its types for nest
yarn add @nestjs/mongoose
yarn add -D @types/mongoose

#Environment variables
1.Create .env file in root folder and add to gitignore
2.yarn add dotenv
3.yarn add -D @types/dotenv

#Test server
yarn test
yarn test:e2e

#Start server
yarn start
yarn start:dev

#Test endpoints
curl 'http://localhost:3000'