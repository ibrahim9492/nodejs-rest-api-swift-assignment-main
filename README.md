
# Node MongoDB REST Server

A RESTful API service built with Node.js and MongoDB.

## Project Overview

This project provides a RESTful API for managing user data with standard CRUD operations.

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Query

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_REPO_URL>

# Step 2: Navigate to the project directory
cd <PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

## API Endpoints

- `GET /users` - Retrieve all users
- `GET /users/:userId` - Retrieve a specific user
- `DELETE /users/:userId` - Delete a specific user
- `PUT /users/:userId` - Update a user

## Project Structure

- `/src` - Source code
  - `/components` - Reusable UI components
  - `/pages` - Application pages including User management
  - `/hooks` - Custom React hooks

## Deployment

The application can be deployed to any hosting service that supports Node.js applications.
