import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Input, message } from 'antd';
import useAuth from '../../hooks/useAuth';

const LoginForm = () => {
  const { login } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        login(values.email, values.password)
          .then(() => {
            message.success('Login successful!');
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
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
