import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Input, message } from 'antd';
import { AuthContext } from '../../context/AuthContext';

const SignupForm = () => {
  const { register } = useContext(AuthContext);

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        register(values.name, values.email, values.password)
          .then(() => {
            message.success('Registration successful!');
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
            <Field
              as={Input}
              name="name"
              placeholder="Enter your name"
            />
            {touched.name && errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div>
            <label>Email</label>
            <Field
              as={Input}
              type="email"
              name="email"
              placeholder="Enter your email"
            />
            {touched.email && errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div>
            <label>Password</label>
            <Field
              as={Input.Password}
              name="password"
              placeholder="Enter your password"
            />
            {touched.password && errors.password && <div className="error">{errors.password}</div>}
          </div>

          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
