import React, { Component, Fragment } from 'react';
import { Alert, Row, Col, Card, CardTitle, Spinner } from 'reactstrap';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  nome: Yup.string().required('Este campo é obrigatório'),
  telefone: Yup.string().required('Este campo é obrigatório'),
  email: Yup.string()
    .email('Favor informar um e-mail válido')
    .required('Este campo é obrigatório'),
  cidade: Yup.string().required('Este campo é obrigatório'),
  mensagem: Yup.string().required('Este campo é obrigatório'),
  uf: Yup.string().required('Este campo é obrigatório')
});

const optionsUf = [
  { id: 'AC', title: 'Acre' },
  { id: 'AL', title: 'Alagoas' },
  { id: 'AM', title: 'Amazonas' },
  { id: 'AP', title: 'Amapá' },
  { id: 'BA', title: 'Bahia' },
  { id: 'CE', title: 'Ceará' },
  { id: 'DF', title: 'Distrito Federal' },
  { id: 'ES', title: 'Espírito Santo' },
  { id: 'GO', title: 'Goiás' },
  { id: 'MA', title: 'Maranhão' },
  { id: 'MG', title: 'Minas Gerais' },
  { id: 'MS', title: 'Mato Grosso do Sul' },
  { id: 'MT', title: 'Mato Grosso' },
  { id: 'PA', title: 'Pará' },
  { id: 'PB', title: 'Paraíba' },
  { id: 'PE', title: 'Pernambuco' },
  { id: 'PI', title: 'Piauí' },
  { id: 'PR', title: 'Paraná' },
  { id: 'RJ', title: 'Rio de Janeiro' },
  { id: 'RN', title: 'Rio Grande do Norte' },
  { id: 'RO', title: 'Rondônia' },
  { id: 'RR', title: 'Roraima' },
  { id: 'RS', title: 'Rio Grande do Sul' },
  { id: 'SC', title: 'Santa Catarina' },
  { id: 'SE', title: 'Sergipe' },
  { id: 'SP', title: 'São Paulo' },
  { id: 'TO', title: 'Tocantins' }
];

class Contato extends Component {
  state = {
    formStatus: 'fill',
    formMessage: ''
  };

  onSubmit = data => {
    this.setState({ formStatus: 'wait' });
    fetch('http://api/enviarEmail', {
      method: 'POST',
      body: JSON.stringify({
        ...data
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        responseJson.resp !== 'erro'
          ? this.setState({
              formMessage: 'Mensagem enviada com sucesso!',
              formStatus: 'send'
            })
          : this.setState({
              formMessage: 'Falha ao enviar, tente novamente mais tarde.',
              formStatus: 'erro'
            });
      });
  };

  render() {
    if (this.state.formStatus === 'fill') {
      return (
        <Fragment>
          <div className='contato__bloco__icones col-md-12'>
            <h1>Contato</h1>
            <Row>
              <Col md={4}>
                <Card
                  body
                  className='contato__card wow bounceInLeft animated'
                  data-wow-delay='0.1s'
                >
                  <CardTitle>
                    <i className='contato__icone fas fa-map-marked-alt' />
                    <br />
                    Nossa Localização
                  </CardTitle>
                  {this.props.escola.endereco}, {this.props.escola.cidade} -{' '}
                  {this.props.escola.uf}
                </Card>
              </Col>
              <Col md={4}>
                <Card
                  body
                  className='contato__card wow bounceInLeft animated'
                  data-wow-delay='0.3s'
                >
                  <CardTitle>
                    <i className='contato__icone fas fa-map-marked-alt' />
                    <br />
                    Ligue-nos
                  </CardTitle>
                  {this.props.escola.telefones}
                </Card>
              </Col>
              <Col md={4}>
                <Card
                  body
                  className='contato__card wow bounceInLeft animated'
                  data-wow-delay='0.5s'
                >
                  <CardTitle>
                    <i className='contato__icone fas fa-map-marked-alt' />
                    <br />
                    Escreva-nos por e-mail
                  </CardTitle>
                  {this.props.escola.email}
                </Card>
              </Col>
            </Row>
          </div>
          <div className='contato__form col-md-12'>
            <h2>Fale Conosco</h2>
            <Form schema={schema} onSubmit={this.onSubmit}>
              <Row>
                <Col md={12}>
                  <Input
                    name='nome'
                    className='form-control'
                    placeholder='Nome completo'
                  />
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  {' '}
                  <Input
                    name='telefone'
                    className='form-control'
                    placeholder='Telefone'
                  />
                </Col>
                <Col md={4}>
                  <Input
                    name='email'
                    type='email'
                    className='form-control'
                    placeholder='E-mail'
                  />
                </Col>
                <Col md={3}>
                  <Input
                    name='cidade'
                    className='form-control'
                    placeholder='Cidade'
                  />
                </Col>
                <Col md={2}>
                  <Select
                    name='uf'
                    options={optionsUf}
                    className='form-control'
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Input
                    multiline
                    name='mensagem'
                    className='form-control'
                    placeholder='Digite aqui a sua mensagem'
                  />
                </Col>
              </Row>

              <button type='submit' className='btn btn-success'>
                Enviar
              </button>
            </Form>
          </div>
        </Fragment>
      );
    } else if (this.state.formStatus === 'wait') {
      return <Spinner color='primary' />;
    } else if (
      this.state.formStatus === 'send' ||
      this.state.formStatus === 'erro'
    ) {
      return (
        <Alert color={this.state.formStatus === 'send' ? 'success' : 'danger'}>
          {this.state.formMessage}
        </Alert>
      );
    }
  }
}

export default Contato;
