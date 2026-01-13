# MyGameLibrary REACT Application

## Project Overview

This project is a full-stack web application consisting of a React fronend and a Node.js/Express backend with a SQLite3 database. The frontend, located in the 'src' directory provides an interactive UI for managing a game library. User can Create, Read, Update and Delete (CRUD) game data through form submissions. The backend files can be found in the 'server' directory, exposes RESTful API endpoints and handles data persistence using SQLite. Game data is stored in a database and retrieved via backend API. When the user clicks on a game fron the list, a modal view opens up, displaying all details about the game, including comments and date_added, which are not included in the main list view.

## What you'll learn

- Basic jsx syntax and component structure
- Foundational React concepts: components, props, states and hooks (useState, useEffect)
- JavaScript Event Handling (clicks, form submissions)
- Creating and managing modals in React
- Conditional rendering and state-driven UI updates
- Styling React components with CSS

## Features

- CRUD Functionality (Create, Read, Update, Delete)
- Dynamic lists and modal views
- Backend API with Express and SQLite for persistent storage
- Form handling and confirmation prompts

## Project Structure

mygamelib/  
├── src/  
│ ├── App.jsx  
│ ├── GameCard.jsx  
│ ├── GameForm.jsx  
│ ├── GameList.jsx  
│ ├── GameModal.jsx  
│ ├── main.jsx  
├── server/  
│ ├── db.js  
│ ├── index.js  
│ ├── package.json  
│ ├── package-lock.json  
├── .gitignore  
├── package.json  
├── package-lock.json  
├── vite.config.js  
├── eslint.config.js  
├── app.css  
├── index.html  
├── README.md  

## How It Works

1. The page loads with your saved library displayed in a list
2. The form at the top allows you to add a new game
3. When a game is added, it appears instantly in the list
4. Clicking on the game row opens a pop-up showing all details for the selected game
5. Games can be updated using the Update button
6. Games can be removed using the Delete button, which will remove the game from the list permanently

## How to Recreate this Project

1. Clone the repository

- git clone https://github.com/dereklow26/mygamelib.git
- cd mygamelib.git

2. Install frontend dependencies

- npm install

3. Start the backend

- Open a second terminal
- cd server
- npm install
- npm start

4. Start the frontend

- Go back to root terminal
- npm run dev
- Open the link Vite prints
- Eg: http://localhost:5173

5. Open the App

- Add a game using the Add button
- Click on a game title to open details modal
- Delete games with confirmation

Note: The backend must be running for the frontend to load and save games.

## Project Extension Ideas

- Add security options such as an account login/sign up
- Create form that allows you to add image file for game covers
- Add CSS customisation
