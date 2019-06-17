import React, { Component } from 'react';
import { Alert, Card, CardTitle, Spinner } from 'reactstrap';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  user: Yup.string().required('Um login é necessário'),
  senha: Yup.string().required('Uma senha é obrigatória')
});

class Login extends Component {
  state = {
    formStatus: 'fill',
    errorMessage: ''
  };

  onSubmit = data => {
    this.setState({ formStatus: 'wait' });
    const { user, senha } = data;
    fetch('http://api/verificarSenha', {
      method: 'POST',
      body: JSON.stringify({
        user,
        senha
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        /*
Nivel 500 - Desenvolvedor
Nivel 100 - Admin
Nivel 90 - Professor
Nivel 10 - Aluno
*/
        if (responseJson.resp !== 'erro') {
          const { nivel, user, nome, id } = responseJson.resp;
          if (nivel >= 90) {
            localStorage.setItem('userAccessLevel', nivel);
            localStorage.setItem('user', nome || user);
            localStorage.setItem('userId', id);
            this.setState({ errorMessage: '' });
            window.location.href = '/dashboard/';
          } else {
            localStorage.setItem('userAccessLevel', nivel);
            localStorage.setItem('user', nome || user);
            localStorage.setItem('userId', id);
            this.setState({ errorMessage: '' });
            window.location.href = '/alunos/';
          }
        } else {
          this.setState({
            formStatus: 'fill',
            errorMessage: 'Login ou Senha inválidos.'
          });
        }
      });
  };

  render() {
    if (this.state.formStatus === 'fill') {
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
              <Input
                name='user'
                className='form-control'
                placeholder='Login'
                autoFocus
              />
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
    } else {
      return <Spinner color='primary' />;
    }
  }
}

export default Login;
