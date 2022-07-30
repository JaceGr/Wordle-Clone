# Wordle Clone

This project is a basic clone of the popular game Wordle. The word list used is similar to the official WORDLE list but has been offset slightly to not ruin the real game. This offset word is seeded from the database changing daily. 
<br>
### Upcoming Features:
* Players can currently create accounts and sign in to save their daily results but storing players results to present daily averages and score boards is an upcoming feature.
* Another upcoming feature is to store the players current/previous attempts in cookies or local storage so that refreshing does not lose daily progress.
* Significant styling Improvements are coming as this was overlooked heavily at the beginning of development in favour of getting the game working.
* Securing the pages and endpoints to logged in users is another future feature that will require users to create an account and log in before playing. I may look at Oauth for this.
* Adding admin users to change daily words and access user accounts is another potential future improvement.

## Tech Stack:
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) 

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) <br>
Javascript and React were used to build out the front end of the application including the WORDLE functionality.

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) <br>
Express was used to set up a back-end of the application. User authentication was implemented here using JWT.

## Usage:
### Set Up
To run this project in a dev environment the react dev server, express server and a mongo database will all need to be set up and started. The npm packages will need to be installed as well.

The following commands are defined in the package.json files to start the clientside and serverside dev servers: <br>
serverside: `npm run dev`<br>
clientside: `npm run start`

### Seeding Words
The Wordle list is found in serverside/Assets/FullWordList.txt.<br>
Words can be seeded by hitting the /seed/seed-from-asset endpoint.  
Suggested on mac, once server is running, execute: `curl -X POST "http://localhost:1337/seed/seed-from-asset"`
