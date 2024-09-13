import React from 'react';
import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
import { Button, Input, message } from 'antd';
import useAuth from '../hooks/useAuth';
import { loginValidationSchema } from '../utils/validation';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // const validationSchema = Yup.object({
  //   email: Yup.string().email('Invalid email').required('Email is required'),
  //   password: Yup.string().required('Password is required'),
  // });

  return (
    <div className="login-container">
      <h2>Login</h2>
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

            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Login
            </Button>

            <div>
              <Button type="link">
                <Link to="/register">Don’t have an account? Register</Link>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
