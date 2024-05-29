# Accounts:
login: szymon password: Szymon123! rola: admin
login: mateusz password: Mateusz123! rola: owner
login: kacper password: Kacper123! rola: owner

# How to run?
1. Make sure you have Node.js installed (preferably version 21+)
https://nodejs.org/en
2. Install docker
https://www.docker.com/products/docker-desktop/
3. Run docker desktop application (make sure it's running in the background)
4. Execute command in terminal in root directory of the project:
`docker-compose up`
This command will start container with database instance.
Don't exit this process unless you finished working with the project.
5. Open separate terminal window and install all required dependencies using
`yarn`
5. Run NestJS application
`yarn start`
6. Now your application is successfuly running, congratulations!
Default URI for API requests is `localhost:3030`
