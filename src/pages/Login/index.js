import React from 'react';
import { Card, CardTitle, Spinner } from 'reactstrap';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  login: Yup.string().required('Um login é necessário'),
  password: Yup.string().required('Uma senha é obrigatória')
});

const Login = () => {
  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className='container'>
      <Card body style={{ margin: 'auto', width: 400, maxWidth: '95%' }}>
        <CardTitle>
          <h1>Login</h1>
        </CardTitle>

        <Form schema={schema} onSubmit={onSubmit}>
          <Input name='login' className='form-control' placeholder='Login' />
          <Input
            name='password'
            type='password'
            className='form-control'
            placeholder='Senha'
          />
          <button type='submit' className='btn btn-success'>
            Login
          </button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
