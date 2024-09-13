import React, { createContext, useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

// Create TodoContext
export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const savedTodos = getFromLocalStorage('todos');
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);
  
  useEffect(() => {
    saveToLocalStorage('todos', todos);
  }, [todos]);

  // Load todos from local storage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (todo) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setTodos((prevTodos) => [...prevTodos, { ...todo, id: Date.now() }]);
        resolve();
      }, 500);
    });
  };

  // Edit an existing todo
  const editTodo = (id, updatedTodo) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
        resolve();
      }, 500);
    });
  };

  // Delete a todo
  const deleteTodo = (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        resolve();
      }, 500);
    });
  };

  // Toggle completion status of a todo
  const toggleTodoCompletion = (id) => {
    return new Promise((resolve) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      resolve();
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        editTodo,
        deleteTodo,
        toggleTodoCompletion,
        editingTodo,
        setEditingTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
