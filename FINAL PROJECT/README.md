# CS340 Final Project

  [![License](https://img.shields.io/badge/License-MIT-orange.svg)](https://choosealicense.com/licenses/mit/)

  [Deployed Application](http://flip3.engr.oregonstate.edu:3998/)

  ## Description

  The Metropolis Property Management database is designed to efficiently manage and track various aspects of a residential property, specifically SkyTower Heights. The database allows the users to do the following:

  * Add new records to the database
  * View details about records stored in the database
  * Modifying existing records
  * Remove records

  The project contains web pages for the following:
  * Units Table
  * Rental Agreements Table
  * Tenants Table
  * Maintenance Requests Table
  * Maintenance Workers Table
  * Request Assignments Table
  * Utility Providers Table
  * Provided Utilities Table

  Each webpage supports all 4 CRUD operations. Dropdown lists are utilized for selecting foreign keys instead of requiring the user to enter IDs for foreign keys. The Request Assignments webpage contains a DELETE and UPDATE for a M:N relationship. 

  ## Table of Contents
  - [Technology](#technology)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)

  ## Technology

  * JavaScript
  * NodeJS
  * MySQL
  * Express
  * Handlebars

  ## Installation

  1. If not already installed, download [Node.js](https://nodejs.org/en/download) and [Git](https://git-scm.com) (if using Windows)
  
  2. Clone the `Group-78-Project` repository to your machine from the command line (Git Bash on Windows) or terminal (Mac)
  
  ```bash
      git clone git@github.com:pinkhaze/Group-78-Project.git
  ```

  3. In your code editor of choice, navigate to the `Group-78-Project` repository

  4. Open a new terminal and type the following command to initialize a new Node project:

  ```bash
      npm init -y
  ```

  5. Type the following command to install the `express`, `express-handlebars` and `mysql` packages:

  ```bash
      npm i express
      npm i express-handlebars
      npm i mysql
  ```

 6. Type the following command to log into your mysql database and entered your password when prompted:

  ```bash
      mysql -u cs340_onid -p -h classmysql.engr.oregonstate.edu
  ```

 7. Type the following command to start the application:

  ```bash
      node app.js
  ```

  ## Credits

  [Node.js Starter App](https://github.com/osu-cs340-ecampus/nodejs-starter-app)

  * Setting up a running server
  * CRUD operations for each table

  [Video Walk Thru on Creating an HTML page for the BSG Planets People Entity](https://canvas.oregonstate.edu/courses/1933532/pages/exploration-web-application-technology?module_item_id=23359469)
  
  * Setting up the user interface

  ## License

  [MIT License](https://choosealicense.com/licenses/mit/)

