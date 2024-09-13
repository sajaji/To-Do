import React from 'react';
import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
import { Button, Input, message, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import '../../styles/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { loginValidationSchema } from '../../utils/validation';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <Row justify="center" align="middle" className="login-container">
      <Col xs={24} sm={18} md={12} lg={8}>
        <Card title="Login" className="login-card">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              login(values.email, values.password)
                .then(() => {
                  message.success('Login successful!');
                  navigate('/todos');
                })
                .catch((err) => {
                  message.error(err.message);
                })
                .finally(() => setSubmitting(false));
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="form-item">
                  <label>Email</label>
                  <Field as={Input} type="email" name="email" placeholder="Enter your email" />
                  {touched.email && errors.email && <div className="error">{errors.email}</div>}
                </div>

                <div className="form-item">
                  <label>Password</label>
                  <Field as={Input.Password} name="password" placeholder="Enter your password" />
                  {touched.password && errors.password && <div className="error">{errors.password}</div>}
                </div>

                <Button type="primary" htmlType="submit" loading={isSubmitting} block>
                  Login
                </Button>

                <div style={{ marginTop: '20px' }}>
                  <Button type="link">
                    <Link to="/register">Don’t have an account? Register</Link>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;
