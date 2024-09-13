import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Input, message } from 'antd';
import { TodoContext } from '../../context/TodoContext';

const EditTodoForm = ({ todo, onClose }) => {
  const { editTodo } = useContext(TodoContext);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <Formik
      initialValues={{ title: todo.title, description: todo.description }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        editTodo(todo.id, {
          ...todo,
          title: values.title,
          description: values.description,
        })
          .then(() => {
            message.success('Todo updated successfully!');
            onClose();
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
            <Field as={Input} name="title" placeholder="Edit todo title" />
            {touched.title && errors.title && <div className="error">{errors.title}</div>}
          </div>

          <div>
            <label>Description</label>
            <Field as={Input.TextArea} name="description" placeholder="Edit todo description" />
            {touched.description && errors.description && <div className="error">{errors.description}</div>}
          </div>

          <div style={{ marginTop: '10px' }}>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Save Changes
            </Button>
          </div>
          
        </Form>
      )}
    </Formik>
  );
};

export default EditTodoForm;
