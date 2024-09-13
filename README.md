# Todo Application with Authentication

## Project Overview
This is a simple React-based Todo application that allows users to authenticate (sign up and log in) and manage their todo list. It provides the following key features:
- User registration (sign up)
- User login
- Manage todo items (add, edit, delete, mark as complete/incomplete)
- Client-side validation using **Formik** and **Yup**
- State management using **React Context**
- UI styled with **Ant Design**

## Features
1. **Authentication**:  
   - Users can register with their email, password, and name.
   - Log in functionality with form validation.
   - Local state management for user authentication.

2. **Todo Management**:  
   - Users can create, edit, delete, and mark todo items as complete/incomplete.
   - Todos have a title and description.
   - Responsive design for both desktop and mobile devices.

3. **Bonus Features**:  
   - Client-side routing with **React Router**.
   - Persistence of todos using local storage to ensure data is not lost on page refresh.

## Project Structure
The project follows a modular component-based structure. Below are the key folders:
- **components**: Contains reusable UI components like authentication forms and the todo list.
- **context**: Manages global state for user authentication and todos.
- **hooks**: Custom hooks for authentication logic.
- **pages**: Separate pages for login, registration, and the todo dashboard.
- **utils**: Validation schemas and other utility functions.

## How to Run This Project

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or later)
- **npm** or **yarn** (npm is used here)

### Steps to Run

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```

4. **Open the application**:
   After running the command, the app will be available at `http://localhost:3000`.

### Available Scripts

- **`npm start`**: Starts the development server.
- **`npm run build`**: Builds the app for production.

## Future Enhancements
Some ideas for future improvement include:
- **Backend Integration**: Adding a backend for real authentication and todo management.
- **Authorization**: Restricting users from viewing other users' todo lists.
- **Testing**: Implementing unit and integration tests for better code reliability.
- **Dark Mode**: Adding theme switching functionality to enhance the UI.