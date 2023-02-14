# Movie Info Application

This is a web application called "FilmFiesta" built with React (Vite) that allows the user to search for movies, retrieve detailed information about them, and add movies to the list of favorites.
</br>
This project makes use of Redux Toolkit and localStorage for state management, React Query for fetching the data from the server, and React Router for routing. The application is styled using TailwindCSS.
</br>
To retrieve movie information, the frontend of the application sends requests to a backend server, built using Node.js, which in turn queries the The Movie Database API. Both the static website and the web server are deployed on Render.

## Table of Contents
- [Features](#features)
- [Demonstration](#demonstration)
- [Technologies](#technologies)
- [Setup](#setup)
- [Contact](#contact)
- [Sources](#sources)

## Features
- Search for movies by title 
- View the detailed information about a movie, i.e. title, description, rating, release date, etc.
- Add movies to the list of favorites for easy access
- View the list of favorite movies
- Responsive design for mobile devices

## Demonstration

## Technologies
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
* ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
* ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
* ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## Setup
Follow the instructions below to run the application locally.
### Getting an API Key
To get an API key, you need to create an account on [The Movie Database](https://www.themoviedb.org/). Once you have an account, you can generate an API key by going to your account settings.

### Installation
Clone the repository:
```bash
$ git clone https://github.com/ke444a/film-fiesta-movie-application.git
```
Install all the dependences:
```bash
$ cd ../film-fiesta-movie-application
$ npm install

# Install the dependencies for the frontend and backend separately
$ cd ../film-fiesta-movie-application/frontend
$ npm install

$ cd ../film-fiesta-movie-application/backend
$ npm install
```
Run the application:
```bash
$ npm run dev
```
### Environment Variables
Create a `.env` file in the root directory of the project 
```bash
$ touch .env
```
Add the following environment variables:
```bash
VITE_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"
VITE_SERVER_URL = "https://movie-db-server.onrender.com"
API_KEY_VALUE = "ADD YOUR API KEY HERE"
API_KEY_NAME = "api_key"
TRENDING_BASE_URL = "https://api.themoviedb.org/3/trending/movie/week"
TOP_RATED_BASE_URL = "https://api.themoviedb.org/3/movie/top_rated"
SEARCH_BASE_URL = "https://api.themoviedb.org/3/search/movie"
MOVIE_BASE_URL = "https://api.themoviedb.org/3/movie/"
```
## Contact
- LinkedIn: [Danyl Kecha](https://www.linkedin.com/in/danyl-kecha-052495161//)
- Mail: danyl.kecha.uk@gmail.com
- GitHub: [ke444a](https://github.com/ke444a)
- Twitter: [@ke444a](https://twitter.com/ke444a)

## Sources
- [The Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction)
- [Movie Icon](https://www.flaticon.com/free-icon/film_1146203?term=movies&page=1&position=12&origin=tag&related_id=1146203)