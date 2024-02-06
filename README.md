# Students CRUD Frontend

## Prerequisites

- Node.js installed on your machine

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/smtbos/mern-students-crud-fe.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mern-students-crud-fe
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

   Make sure to update the values in the `.env` file with your own values.

## Starting the server in Development Mode

To start the server in development mode, run the following command:

```bash
npm start
```

## To create a production build

To create a production build, run the following command:

```bash
npm run build
```

The build folder is ready to be deployed.
You may serve it with a static server:

```bash
npm install -g serve
serve -s build
```