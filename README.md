# Docker-MeanStack
A Basic Containerized Solution to implement the MEAN stack.

# Prerequisites:
### Have Docker installed
### Have knowledge of terminal

# Setup Steps
### create ```.env``` file inside root directory and specify the following environment variables 
```
#php-myadmin
PMA_HOST=<your_database_name>
PMA_USER=<your_username>
PMA_PASSWORD=<your_password>

#mysql
MYSQL_DATABASE=<your_database_name>
MYSQL_ROOT_PASSWORD=<your_password>

#node js
JWT_SECRET=<your_secret_key>
```
### cd to ```Desktop``` and run ```git clone https://github.com/Jsostmann/Docker-MeanStack.git fullstack```
### cd into ```fullstack``` and run ```docker-compose build``` then run ```docker-compose up``` 
### go into server directory and run ```npm i ``` to install all necessary dependencies


## Frameworks
### nodeJS Mysql
### Express 
### Bcrypt
### JWT 
