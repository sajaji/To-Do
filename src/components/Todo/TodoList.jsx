import React from 'react';
import { List, Modal, Button, Space, Typography } from 'antd';
import useTodos from '../../hooks/useTodos';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import EditTodoForm from './EditTodoForm';

const { Title } = Typography;

const TodoList = () => {
  const { todos, setEditingTodo, editingTodo } = useTodos();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={3}>Todo List</Title>

        <Button type="primary" onClick={openModal} style={{ marginBottom: '16px' }}>
          Add Todo
        </Button>

        <Modal
          title="Add New Todo"
          visible={isModalVisible}
          onCancel={closeModal}
          footer={null}
          destroyOnClose
        >
          <AddTodoForm />
        </Modal>

        <List
          itemLayout="horizontal"
          dataSource={todos}
          renderItem={(todo) => (
            <TodoItem todo={todo} setEditingTodo={setEditingTodo} />
          )}
          style={{ borderRadius: '8px', backgroundColor: '#f9f9f9', padding: '16px' }}
        />

        {editingTodo && (
          <Modal
            title="Edit Todo"
            visible={!!editingTodo}
            onCancel={() => setEditingTodo(null)}
            footer={null}
            destroyOnClose
          >
            <EditTodoForm todo={editingTodo} onClose={() => setEditingTodo(null)} />
          </Modal>
        )}
      </Space>
    </div>
  );
};

export default TodoList;
