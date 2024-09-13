import React from 'react';
import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
import { Button, Input, message } from 'antd';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { loginValidationSchema } from '../utils/validation';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // const validationSchema = Yup.object({
  //   name: Yup.string().required('Name is required'),
  //   email: Yup.string().email('Invalid email').required('Email is required'),
  //   password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
  // });

  return (
    <div className="register-container">
      <h2>Register</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={loginValidationSchema}
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

            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
