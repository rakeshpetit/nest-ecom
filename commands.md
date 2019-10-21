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

#Create shared module
nest g module shared
nest g service shared/user

#bcrypt for encrypting auth
yarn add bcrypt
yarn add -D @types/bcrypt

#Create auth module
nest g module auth
nest g controller auth

#Add passport js
yarn add @nestjs/passport passport passport-jwt
yarn add -D @types/passport @types/passport-jwt

#Create auth service
nest g service auth

#Create product module
nest g module product
nest g controller product
nest g service product

#Architecture of API
AppModule
    modules 
        MongooseModule - forRoot to connect to mongodb
        SharedModule 
        AuthModule
    controllers
        AppController - uses AppService for getHello method
    services
        AppService - Injectable with getHello method

SharedModule
    modules
        MongooseModule - forFeature with schema access
    services
        UserService - Injectable with methods for create user, login user
            get data from mongoose to create/login users. Instantiate mongoose model
            via constructor 

AuthModule
    modules
        SharedModule
    controllers
        AuthController - provide routes for login and register. Instantiate 
            UserService via constructor.