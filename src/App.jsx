import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import AuthProvider from './context/AuthContext';
import TodoProvider from './context/TodoContext';

const App = () => {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <AppRoutes />
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
};

export default App;
