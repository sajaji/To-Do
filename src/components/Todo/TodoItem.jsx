import React, { useContext } from 'react';
import { Button, List, Checkbox, Space } from 'antd';
import { TodoContext } from '../../context/TodoContext';

const TodoItem = ({ todo }) => {
  const { toggleTodoCompletion, deleteTodo, setEditingTodo } = useContext(TodoContext);

  return (
    <List.Item
      actions={[
        <Space>
          <Button type="link" onClick={() => setEditingTodo(todo)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => deleteTodo(todo.id)}>
            Delete
          </Button>
        </Space>
      ]}
    >
      <List.Item.Meta
        title={
          <Checkbox
            checked={todo.completed}
            onChange={() => toggleTodoCompletion(todo.id)}
          >
            {todo.title}
          </Checkbox>
        }
        description={todo.description}
      />
    </List.Item>
  );
};

export default TodoItem;
