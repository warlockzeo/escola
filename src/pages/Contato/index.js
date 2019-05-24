import React from 'react';
import { Row, Col, Card, CardTitle, Spinner } from 'reactstrap';
import { Form, Input, Select, Textarea } from '@rocketseat/unform';
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

const Contato = () => {
  function onSubmit(data) {
    console.log(data);
  }

  const options = [
    { id: 'PE', title: 'Pernambuco' },
    { id: 'PB', title: 'Paraíba' },
    { id: 'PA', title: 'Pará' }
  ];

  return (
    <>
      <div className='contato__bloco__icones col-md-12'>
        <h1>Contato</h1>
        <Row>
          <Col md={4}>
            <Card body style={{ margin: 'auto', width: 400, maxWidth: '95%' }}>
              <CardTitle>
                <i className='contato__icone fas fa-map-marked-alt' />
                <br />
                Nossa Localização
              </CardTitle>
              Rua Joaquim Barbosa de Souza, 02, Centro, Vertentes - PE
            </Card>
          </Col>
          <Col md={4}>
            <Card body style={{ margin: 'auto', width: 400, maxWidth: '95%' }}>
              <CardTitle>
                <i className='contato__icone fas fa-map-marked-alt' />
                <br />
                Ligue-nos
              </CardTitle>
              (81) 99128-2508
            </Card>
          </Col>
          <Col md={4}>
            <Card body style={{ margin: 'auto', width: 400, maxWidth: '95%' }}>
              <CardTitle>
                <i className='contato__icone fas fa-map-marked-alt' />
                <br />
                Escreva-nos por e-mail
              </CardTitle>
              secretaria@sagradocoracaovertentes.com.br
            </Card>
          </Col>
        </Row>
      </div>
      <div className='contato__form col-md-12'>
        <h2>Fale Conosco</h2>
        <Form schema={schema} onSubmit={onSubmit}>
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
              <Select name='uf' options={options} className='form-control' />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Textarea
                name='mensagem'
                className='form-control'
                placeholder='Digite aqui a sua mensagem'
              />
            </Col>
          </Row>

          <button type='submit' className='btn btn-success'>
            Login
          </button>
        </Form>
      </div>
    </>
  );
};

export default Contato;
