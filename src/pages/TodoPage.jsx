import React from 'react';
import TodoList from '../components/Todo/TodoList';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const TodoPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      navigate('/login');
    });
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="todo-page">
      <h2>Welcome, {user.name}</h2>
      <Button onClick={handleLogout} type="primary" danger>
        Logout
      </Button>
      <TodoList />
    </div>
  );
};

export default TodoPage;
