# Coffee Shop Locator App - Bay Area

Welcome to the Coffee Shop Locator App for the Bay Area. This web application helps users find the nearest coffee shops based on their zip code. It also provides information about how many times a zip code has been queried on a given date. The app uses Google Maps API for location services, HTML/CSS/JavaScript for the frontend, and MongoDB as the backend data store. The server-side is built using Express.js.

## Authors
This Coffee Shop Locator App was created by the following individuals:
- Gaurang Jotwani
- Jishva Shah

## Screenshots:
![image](https://github.com/GaurangJotwani/StoreLocator/assets/77269630/7d96000c-f766-4ece-b6a8-9e8b45f88d7c)
## Thumbnail link:
https://drive.google.com/file/d/1CbeecVrXwPvuNPcgCcBRUdWdWYI8R6u6/view?usp=sharing
## Slides link:
https://docs.google.com/presentation/d/12msIifGvIZOlOEdY9bwK7pyhyO8Fb8Cil5fdKV9fphc/edit?usp=sharing
## Deployed Website Link:
## Public Video Demnstration Link:

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Location Search:** Users can enter a zip code to find the nearest coffee shops in the Bay Area using the Google Maps API.

- **Query Tracking:** The app keeps a record of the number of times a specific zip code has been queried on a given date.

- **MongoDB Data Store:** Store and retrieve coffee shop and query data using a MongoDB database.

- **Express.js Backend:** The backend server is built with Express.js, handling requests and managing data operations.

## Getting Started

These instructions will help you set up the Coffee Shop Locator App on your local machine for development and testing purposes.

### Prerequisites

Before you begin, make sure you have the following software installed:

- Node.js
- MongoDB
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/coffee-shop-locator.git

   ```

2. Navigate to the project directory:
   cd coffee-shop-locator

3. Install the required npm packages:
   npm install

4. Create a .env file in the project root directory to store your environment variables. Include your Google Maps API key and MongoDB connection details:
   GOOGLE_MAPS_API_KEY=your_api_key
   MONGODB_URI=your_mongodb_uri

5. Start the server:
   npm start

Usage
Enter a zip code in the search bar and press the search button.

The app will display a list of nearby coffee shops on the map.

The app will also keep track of the query with the zip code and the date of the search in the MongoDB database.

Architecture
The Coffee Shop Locator App is built using the following technologies:

Frontend: HTML, CSS, JavaScript
Frontend Framework: None (Vanilla JavaScript)
Backend: Node.js with Express.js
Database: MongoDB
Map Services: Google Maps API
The frontend communicates with the backend server via RESTful API calls, and the server handles data retrieval and storage in MongoDB.
