## Capstone-project

This project consists of a front-end, back-end, and a machine learning model that is integrated using FastAPI. Follow the steps below to set up and run the project locally. This project was developed using the PERN stack, with the machine learning model being trained on the included Oxford-IIT dataset, using Pytorch.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (for front-end and back-end)
- [Python 3.x](https://www.python.org/) (for the machine learning model)
- [pip](https://pip.pypa.io/en/stable/) (for managing Python dependencies)
- [npm](https://www.npmjs.com/) (for managing JavaScript dependencies)

## Setup Instructions

### Front-End

1. Navigate to the front-end directory:

   ```bash
   cd front-end
   ```

2. Install front-end dependencies:

   ```bash
   npm i
   ```

3. Run the front-end locally:

   ```bash
   npm run dev
   ```

   The front-end should now be accessible in your browser at `http://localhost:5173`.

### Back-End

1. Navigate to the back-end directory:

   ```bash
   cd back-end
   ```

2. Install back-end dependencies:

   ```bash
   npm install
   ```

3. Run the back-end server:

   ```bash
   npm run dev
   ```

   The back-end should now be running at `http://localhost:8080`.

### Machine Learning Model

1. Navigate to the model directory:

   ```bash
   cd modeltraining
   ```

2. Install the required Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the FastAPI server with Uvicorn:

   ```bash
   uvicorn modelapi:app --reload
   ```

   The machine learning model API should now be accessible at `http://localhost:8000`.

## Usage

- The front-end communicates with the back-end to display and manage data.
- The back-end exposes endpoints for the front-end and communicates with the model API.
- The model API is used for running machine learning predictions for pet images.

Make sure all components (front-end, back-end, and model) are running for the application to function properly. Without a component running, the project will crash.
