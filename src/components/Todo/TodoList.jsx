import React from 'react';
import { List, Modal, Button } from 'antd';
import useTodos from '../../hooks/useTodos';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import EditTodoForm from './EditTodoForm';

const TodoList = () => {
  const { todos, setEditingTodo, editingTodo } = useTodos();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <div>
      <Button type="primary" onClick={openModal}>
        Add Todo
      </Button>
      <Modal
        title="Add New Todo"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <AddTodoForm />
      </Modal>

      <List
        itemLayout="horizontal"
        dataSource={todos}
        renderItem={(todo) => (
          <TodoItem todo={todo} setEditingTodo={setEditingTodo} />
        )}
      />

      {editingTodo && (
        <Modal
          title="Edit Todo"
          visible={!!editingTodo}
          onCancel={() => setEditingTodo(null)}
          footer={null}
        >
          <EditTodoForm todo={editingTodo} onClose={() => setEditingTodo(null)} />
        </Modal>
      )}
    </div>
  );
};

export default TodoList;
