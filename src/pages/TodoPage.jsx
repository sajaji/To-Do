import React from 'react';
import TodoList from '../components/Todo/TodoList';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Space, Layout } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

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
    <Layout>
      <Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <Title level={2} style={{ color: '#fff' }}>Welcome, {user.name}</Title>
          <Button onClick={handleLogout} type="primary" danger>
            Logout
          </Button>
        </div>
      </Header>
      <Content style={{ padding: '24px', background: '#fff' }}>
        <TodoList />
      </Content>
    </Layout>
  );
};

export default TodoPage;
