## This is a web application built with React and Vite.

### Clone the repository:

```git clone https://github.com/klintonkuach/amberflo-exercise```

### Navigate to the project directory:

```cd amberflo-exercise```

### Before running the application, you need to set up your API key. Please follow these steps:

1. Rename the `.env.example` file in the root directory of the project to `.env`.

2. Open the `.env` file and replace the placeholder value for the API_KEY with your own API key.

### Install the dependencies:

```npm install```

### Run the app:

```npm run dev```

This will start the development server and the app will be accessible at http://localhost:5173

```Node.js (version 18.16 or higher)```

```npm (version 9.7.2 or higher)```

## Additional ideas
In the current implementation, creating a meter redirects to a new page.

I have considered a couple of QoL changes. One idea is to replace the page redirection for creating and editing meters with modals.

Additionally, to enhance the usability of the table, I was planning to include an arrow icon next to each sortable column header, which would indicate whether the column is sorted in ascending or descending order.