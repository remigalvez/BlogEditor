# Blog Editor
Blog editor webapp for YouTube channel "A Privileged Vegan". Includes image and video compatibility, text-styling, and user-friendly interface.

All written in ReactJS. 

ReactJS Documentation: https://facebook.github.io/react/docs/getting-started.html 

## Testing environment

Run command ```npm start``` to watch files for changes and start Node server. 

Setup PostgreSQL database using SQL statements in ''Models'' directory. File ''1.sql'' contains all necessary statements to setup of database.

### Technologies
Node – Express – PostgreSQL – React

### Organization

All React HTML elements are in the "components" directory.
All database functions are in the "db" directory.
All database scripts are in the "models" directory.

"client.js" calls all React files, and is bundled into the public directory, in a file called "bundle.js".
