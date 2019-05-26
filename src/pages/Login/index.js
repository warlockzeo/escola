import React, { Component } from 'react';
import { Alert, Card, CardTitle, Spinner } from 'reactstrap';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  login: Yup.string().required('Um login é necessário'),
  senha: Yup.string().required('Uma senha é obrigatória')
});

class Login extends Component {
  state = {
    errorMessage: ''
  };

  onSubmit = data => {
    const { login, senha } = data;
    fetch('http://api/verificarSenha', {
      method: 'POST',
      body: JSON.stringify({
        login: login,
        senha: senha
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.resp !== 'erro') {
          const { nome, id } = responseJson.resp;
          localStorage.setItem('user', nome);
          localStorage.setItem('userId', id);
          localStorage.setItem('userAccessLevel', '1');
          this.setState({ errorMessage: '' });
          window.location.href = '/alunos/';
        } else {
          if (login === 'admin') {
            localStorage.setItem('userAccessLevel', '9');
            localStorage.setItem('user', 'admin');
            localStorage.setItem('userId', '0');
            this.setState({ errorMessage: '' });
            window.location.href = '/dashboard/';
          } else {
            this.setState({ errorMessage: 'Login ou Senha inválidos.' });
          }
        }
      });
  };

  render() {
    return (
      <div className='container'>
        <Card
          body
          style={{ margin: 'auto', width: 400, maxWidth: '95%' }}
          className='wow bounceInRight animated'
        >
          <CardTitle>
            <h1>Login</h1>
          </CardTitle>

          <Form schema={schema} onSubmit={this.onSubmit}>
            <Input name='login' className='form-control' placeholder='Login' />
            <Input
              name='senha'
              type='password'
              className='form-control'
              placeholder='Senha'
            />
            {this.state.errorMessage && (
              <Alert color='danger'>{this.state.errorMessage}</Alert>
            )}
            <button type='submit' className='btn btn-success'>
              Login
            </button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Login;
