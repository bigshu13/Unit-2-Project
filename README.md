# Unit-2-Project Anime API
Welcome to my Anime API. Here you will be able to login as a user and be able to create and store your favorite animes. 
If you ever need somewhere to store your favorite shows, this is the API than can do it for you.

# Prerequisites
  Node.js
  
  Node.js will be required to run this API on your system. You can check if you have it installed by typing "node -v" in your terminal. If
  you don't have node.js installed, you can go to their website to download it.
  
  Nodemon
  
  You will need to have Nodemon installed globally on your system. "npm i -g nodemon" is what you would type in your terminal to install nodemon globally 

  # How to Start
  1. To start, you will need to create an empty folder on your computer.
  2. Next, you will clone this repository SSH using "git clone git@github.com:bigshu13/Unit-2-Project.git"(Quotation marks are not neccesary)
  3. Once you created the empty folder in your terminal, you will copy and paste the git clone in step 2.
  4. Once you see everything downloaded, type "npm i" to install all the dependencies needed for the repo.
  5. You will need to create a new file in the repo called ".env"
  6. Type "code ." in your terminal to open the repo.
  7. In the .env file you will need to put a MONGO_URI(you get from MongoDB account) and a SECRET key(which you get from the SHA256 website)
     

  # Starting the App
  To start the app, type "nodemon" in the terminal. You will see the servers turn on in the terminal.

  # To Run Tests
  To run the tests through Supertest and Jest, open another terminal and type "npm run test". You should see all the tests pass meaning all the routes work.

  # Postman Testing
  To test routes in Postman, you will need to know there are two routes. "/users" and "/animes" are routes you will be putting in the postman to test. You will need 
  to use "http//:localhost:3000/" for the URL then you will add one the main routes above.
  
