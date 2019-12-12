import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Alert, Card, CardTitle, Spinner } from 'reactstrap';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import {setLogin} from '../../store/actions/user';

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
    this.props.setLogin(data);
  };

  render() {
    if (this.state.formStatus === 'fill') {
      return (
        <div>
          <Card body className='login__card'>
            <CardTitle>
              <h1 style={{ margin: 0 }}>Login</h1>
            </CardTitle>

            <Form schema={schema} onSubmit={this.onSubmit}>
              <Row>
                <Col md={6}>
                  <Input
                    name='user'
                    className='form-control'
                    placeholder='Login'
                    autoFocus
                  />
                </Col>
                <Col md={6}>
                  <Input
                    name='senha'
                    type='password'
                    className='form-control'
                    placeholder='Senha'
                  />
                </Col>
              </Row>
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

const mapStateToProps = state => ({
  ...state.user.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({setLogin}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);