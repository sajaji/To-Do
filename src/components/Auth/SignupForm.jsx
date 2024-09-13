import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Input, message, Row, Col, Card } from 'antd';
import useAuth from '../../hooks/useAuth';
import { registerValidationSchema } from '../../utils/validation';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/LoginForm.css';

const SignupForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <Row justify="center" align="middle" className="login-container">
      <Col xs={24} sm={18} md={12} lg={8}>
      <Card  title="Register" className="login-card">
        <Formik
          initialValues={{name: '', email: '', password: ''}}
          validationSchema={registerValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            register(values.name, values.email, values.password)
              .then(() => {
                message.success('Registration successful!');
                navigate('/login');
              })
              .catch((err) => {
                message.error(err.message);
              })
              .finally(() => setSubmitting(false));
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div>
                <label>Name</label>
                <Field as={Input} name="name" placeholder="Enter your name" />
                {touched.name && errors.name && <div className="error">{errors.name}</div>}
              </div>

              <div>
                <label>Email</label>
                <Field as={Input} type="email" name="email" placeholder="Enter your email" />
                {touched.email && errors.email && <div className="error">{errors.email}</div>}
              </div>

              <div>
                <label>Password</label>
                <Field as={Input.Password} name="password" placeholder="Enter your password" />
                {touched.password && errors.password && <div className="error">{errors.password}</div>}
              </div>

              <Button type="primary" htmlType="submit" loading={isSubmitting} style={{ marginTop: '20px' }}>
                Register
              </Button>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Button type="link">
                  <Link to="/login">Already have an account? Login</Link>
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

export default SignupForm;
