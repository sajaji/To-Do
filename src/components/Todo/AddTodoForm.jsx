import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Input, message } from 'antd';
import { TodoContext } from '../../context/TodoContext';

const AddTodoForm = () => {
  const { addTodo } = useContext(TodoContext);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setSubmitting(true);
        addTodo({
          title: values.title,
          description: values.description,
          completed: false,
        })
          .then(() => {
            message.success('Todo added successfully!');
            resetForm();
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
            <label>Title</label>
            <Field as={Input} name="title" placeholder="Enter todo title" />
            {touched.title && errors.title && <div className="error">{errors.title}</div>}
          </div>

          <div>
            <label>Description</label>
            <Field as={Input.TextArea} name="description" placeholder="Enter todo description" />
            {touched.description && errors.description && <div className="error">{errors.description}</div>}
          </div>

          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Add Todo
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddTodoForm;
