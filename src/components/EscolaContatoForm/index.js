import React, { Component, Fragment } from 'react';
import { Button, Alert, Row, Col, Spinner } from 'reactstrap';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import style from 'styled-components';

const Label = style.label`
  display: block;
  text-align: left;
  font-weight: bold;
  padding-left: 10px;
`;

const schema = Yup.object().shape({
  nomeEscola: Yup.string().required('Este campo é obrigatório'),
  telefones: Yup.string().required('Este campo é obrigatório'),
  email: Yup.string('Este não é um email válido'),
  endereco: Yup.string().required('Este campo é obrigatório'),
  cidade: Yup.string().required('Este campo é obrigatório'),
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

class EscolaContatoForm extends Component {
  state = {
    formStatus: 'fill',
    formMessage: ''
  };

  onSubmit = async data => {
    console.log(data);
    await this.props.onSubmit(data);
  };

  onCancel = e => {
    e.preventDefault();
    this.props.onCancel();
  };

  onChange = () => {
    this.props.onChange();
  };

  componentWillMount() {
    this.props.errorMessage &&
      this.setState({
        formMessage: this.props.errorMessage,
        formStatus: 'erro'
      });
  }

  render() {
    console.log(this.props.data);
    if (this.state.formStatus === 'fill') {
      return (
        <Fragment>
          <div className='container'>
            <h2>Contatos</h2>
            <Form
              schema={schema}
              onSubmit={this.onSubmit}
              initialData={this.props.data}
            >
              <Row>
                <Col md={12}>
                  <Label>Nome da Escola</Label>
                  <Input
                    name='nomeEscola'
                    className='form-control'
                    placeholder='Nome da Escola'
                    title='Nome da Escola'
                    onChange={this.onChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <Label>Telefones</Label>
                  <Input
                    name='telefones'
                    className='form-control'
                    placeholder='Telefones'
                    title='Telefones'
                    onChange={this.onChange}
                  />
                </Col>
                <Col md={4}>
                  <Label>E-mail</Label>
                  <Input
                    name='email'
                    type='email'
                    className='form-control'
                    placeholder='E-mail'
                    title='E-mail'
                    onChange={this.onChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={7}>
                  <Label>Endereço</Label>
                  <Input
                    name='endereco'
                    className='form-control'
                    placeholder='Endereço'
                    title='Endereço'
                    onChange={this.onChange}
                  />
                </Col>
                <Col md={3}>
                  <Label>Cidade</Label>
                  <Input
                    name='cidade'
                    className='form-control'
                    placeholder='Cidade'
                    title='Cidade'
                    onChange={this.onChange}
                  />
                </Col>
                <Col md={2}>
                  <Label>UF</Label>
                  <Select
                    name='uf'
                    className='form-control'
                    title='UF'
                    onChange={this.onChange}
                    options={optionsUf}
                  />
                </Col>
              </Row>
              {this.props.showButtons && (
                <Fragment>
                  <Row>
                    <Col md={6}>
                      <button type='submit' className='btn btn-success'>
                        Gravar
                      </button>
                    </Col>
                    <Col md={6}>
                      <button
                        className='btn btn-danger'
                        onClick={this.onCancel}
                      >
                        Cancelar
                      </button>
                    </Col>
                  </Row>
                </Fragment>
              )}
            </Form>
          </div>
        </Fragment>
      );
    } else if (this.state.formStatus === 'wait') {
      return (
        <div className='wrap100vh'>
          <Spinner color='primary' />
        </div>
      );
    } else if (
      this.state.formStatus === 'send' ||
      this.state.formStatus === 'erro'
    ) {
      return (
        <Alert color={this.state.formStatus === 'send' ? 'success' : 'danger'}>
          <p>{this.state.formMessage}</p>
          <Button onClick={() => this.setState({ formStatus: 'fill' })}>
            OK
          </Button>
        </Alert>
      );
    }
  }
}

export default EscolaContatoForm;
