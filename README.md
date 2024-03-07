# Web Development Project

Welcome to my web development project! This project aims to create a stunning website from scratch using HTML/CSS and integrating it with JavaScript for functionality. I'll also be utilizing backend APIs to fetch data dynamically.

## Deployment

The project is deployed and can be accessed [here](https://sd-0224.github.io/Hamada-Assi-project1/).


## Project Overview

In this project, I have developed a website with the following functionalities:

- **Dark Mode Toggle**: Allow users to switch between dark and light modes.
- **Favorites Panel**: Toggle favorites panel when clicked.
- **Dynamic Topics Listing**: Fetch web topics from backend API and display dynamically.
- **Search Functionality**: Allow users to search for web topics.
- **Sorting and Filtering**: Ability to sort topics and filter by category.
- **Details Page for Each Topic**: Click on a topic card to view its details page.
- **Add to Favorites Feature**: Allow users to add topics to favorites.

## Getting Started

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Open `index.html` in your preferred web browser.

## Folder Structure

- `css/`: Contains CSS stylesheets.
- `js/`: Contains JavaScript files.
- `index.html`: Main HTML file for the website.

## Backend APIs

- `GET /topics/list`: Retrieves the list of web topics.
- `GET /topics/list?phrase=CSS`: Retrieves web topics based on the search phrase.
- `GET /topics/details/:id`: Retrieves details of a specific topic.

## How to Use

- **Dark Mode Toggle**: Click the dark mode toggle button in the header to switch between dark and light modes. The selected mode is persisted using local storage.
- **Favorites Panel**: Click the favorites button in the header to toggle the favorites panel.
- **Search**: Type in the search field to search for web topics. Search is debounced for 300ms.
- **Sorting and Filtering**: Use the sort by and filter by options to sort and filter topics based on criteria.
- **Details Page**: Click on a topic card to view its details page. The URL is shareable and holds the parameters needed to open the page.
- **Add to Favorites**: On the topic details page, click on the "Add to Favorites" button to add the topic to favorites. If already added, the button will change to "Remove from Favorites".

## Acknowledgements

Special thanks to TAP for their support and guidance throughout the project development.
