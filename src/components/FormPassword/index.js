import React from 'react';
import { Card } from 'reactstrap';

const FormPassword = props => {
  const nome = props.dados.nome.split(' ');
  let iniciais = '';
  for (let i = 1; i < nome.length; i++) {
    iniciais += nome[i].substring(0, 1);
  }
  const data = props.dados.dataNasc.split('-');
  const user = `${nome[0]}${data[1]}${data[2]}${iniciais}`;

  const senha = `a${Math.random()}`.substring(3, 13);

  const onSubmit = e => {
    e.preventDefault();
    props.password({ user, senha });
  };

  return (
    <div className='wrap100vh'>
      <Card>
        <h1>Senha criada com sucesso!</h1>
        <p>
          <span className='legenda__dados'>Usuário: </span>
          {user}
        </p>
        <p>
          <span className='legenda__dados'>Senha: </span>
          {senha}
        </p>
        <button type='submit' className='btn btn-success' onClick={onSubmit}>
          Confirmar
        </button>
      </Card>
    </div>
  );
};

export default FormPassword;
