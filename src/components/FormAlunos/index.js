import React, { Component, Fragment } from 'react';
import { Button, Alert, Row, Col, Spinner } from 'reactstrap';
import { Form, Input, Select, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  id: Yup.string(),
  nome: Yup.string().required('Este campo é obrigatório'),
  mae: Yup.string().required('Este campo é obrigatório'),
  pai: Yup.string(),
  fonePai: Yup.string(),
  foneMae: Yup.string(),
  responsavel: Yup.string().required('Este campo é obrigatório'),
  endereco: Yup.string().required('Este campo é obrigatório'),
  cidade: Yup.string().required('Este campo é obrigatório'),
  uf: Yup.string().required('Este campo é obrigatório'),
  sexo: Yup.string().required('Este campo é obrigatório'),
  dataNasc: Yup.string().required('Este campo é obrigatório'),
  obs: Yup.string()
});

const optionsSexo = [
  { id: 'M', title: 'Masculino' },
  { id: 'F', title: 'Feminino' }
];

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

class FormAlunos extends Component {
  state = {
    formStatus: 'fill',
    formMessage: ''
  };

  onSubmit = async data => {
    console.log(data);
    await this.props.onSubmit(data);
  };

  componentWillMount() {
    this.props.errorMessage &&
      this.setState({
        formMessage: this.props.errorMessage,
        formStatus: 'erro'
      });
  }

  render() {
    console.log(this.props.dados);
    if (this.state.formStatus === 'fill') {
      return (
        <Fragment>
          <div className='container'>
            <h2>Cadastro Aluno</h2>
            <Form
              schema={schema}
              onSubmit={this.props.onSubmit}
              initialData={this.props.dados}
            >
              <Row>
                <Col md={12}>
                  <Input
                    name='nome'
                    className='form-control'
                    placeholder='Nome completo'
                    autoFocus
                  />
                  <Input name='id' className='d-none' />
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Input
                    name='mae'
                    className='form-control'
                    placeholder='Nome completo da mãe'
                  />
                </Col>
                <Col md={2}>
                  <Input
                    name='foneMae'
                    className='form-control'
                    placeholder='Telefone da mãe'
                  />
                </Col>
                <Col md={4}>
                  <Input
                    name='pai'
                    className='form-control'
                    placeholder='Nome completo do Pai'
                  />
                </Col>
                <Col md={2}>
                  <Input
                    name='fonePai'
                    className='form-control'
                    placeholder='Telefone do pai'
                  />
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Input
                    name='responsavel'
                    className='form-control'
                    placeholder='Responsavel'
                  />
                </Col>
                <Col md={3}>
                  <Input
                    name='dataNasc'
                    type='date'
                    className='form-control'
                    placeholder='Data de Nascimento'
                  />
                </Col>
                <Col md={2}>
                  <Select
                    name='sexo'
                    options={optionsSexo}
                    className='form-control'
                  />
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <Input
                    name='email'
                    type='email'
                    className='form-control'
                    placeholder='E-mail'
                  />
                </Col>
                <Col md={4}>
                  <Input
                    name='endereco'
                    className='form-control'
                    placeholder='Endereço'
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
                  <Textarea
                    name='obs'
                    className='form-control'
                    placeholder='Observações'
                  />
                </Col>
              </Row>
              <button type='submit' className='btn btn-success'>
                Gravar
              </button>
              <button className='btn btn-danger' onClick={this.props.onCancel}>
                Cancelar
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
          <p>{this.state.formMessage}</p>
          <Button onClick={() => this.setState({ formStatus: 'fill' })}>
            OK
          </Button>
        </Alert>
      );
    }
  }
}

export default FormAlunos;
