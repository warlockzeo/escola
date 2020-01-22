import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';

const H1 = Styled.h1`
  color: #000;
  font-size: 1.5em;
  margin: 0;
`;

const H2 = Styled.h2`
  color: #000;
  font-size: 1.5em;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
`;

const PH1 = Styled.p`
  color: #000;
  text-align: center;
`;

const P = Styled.p`
  color: #000;
  text-align: justify;
`;

const Center = Styled.span`
  text-align: center;
`;

const Input = Styled.input`
  border: 0;
  background-color: #ccc;
  padding: 2px 10px !important;
  border-radius: 0 !important;
`;

const Textarea = Styled.textarea`
  border: 0;
  background-color: #ccc;
  padding: 2px 10px !important;
  border-radius: 0 !important;
`;

const DocHistorico = () => {
  const [campos, setCampos] = useState({});
  const genero = campos.sexo === 'M' ? 'o' : 'a';

  const isCheked = (field) => {
    if(field.checked === true){
      return [field.value, field.value.length];
    } 
    return ['', 0];
  };

  const changeField = (e) => {
    const field = e.currentTarget;
    if(field.type === 'checkbox'){
      setCampos({
        ...campos,
        [field.name]: isCheked(field)
      });      
    } else {
      setCampos({
        ...campos,
        [field.name]: [field.value, field.value.length]
      });
    }
  };
  
  useEffect((props) => {
    console.log(props);
  });
 
  return (
    <>
    <div className='pag1'>
      <H1>EDUCANDÁRIO SAGRADO CORAÇÃO DE JESUS</H1>
      <PH1>
        Educação Infantil e Ensino Fundamental do 1º ao 9º Ano<br />
        CNPJ 05.061.549/0001-00<br />
        Cadastro Escolar: Nº P 364.002<br />
        Autorização portaria SE Nº 1874<br />
        Publicado no D.O. de 20/03/03
      </PH1>

      <H2>Histórico Escolar do Ensino Fundamental</H2>
      <P>
        Certificamos que, <Input name='nome' type='text' value={campos.nome && campos.nome[0]} onChange={changeField} style={{width: campos.nome ? campos.nome[1]*8 + 20 : 10}} /><br />
        Filh{genero} de: <Input name='pai' type='text' value={campos.pai && campos.pai[0]} onChange={changeField} style={{width: campos.pai ? campos.pai[1]*8 + 20 : 10}} /><br />
        E de: <Input name='mae' type='text' value={campos.mae && campos.mae[0]} onChange={changeField} style={{width: campos.mae ? campos.mae[1]*8 + 20 : 10}} /><br />
        Nascid{genero} em: <Input name='dataNasc' type='date' value={campos.dataNasc && campos.dataNasc[0]} onChange={changeField} /><br />
        Natural de:	<Input name='natural' type='text' value={campos.natural && campos.natural[0]} onChange={changeField} style={{width: campos.natural ? campos.natural[1]*8 + 20 : 10}} />		UF: <Input name='uf' type='text' value={campos.uf && campos.uf[0]} onChange={changeField} maxLength='2' style={{width: 45, textTransform: 'uppercase'}} /><br />
        Concluiu a <Input name='serie' type='number' value={campos.serie && campos.serie[0]} onChange={changeField} maxLength='1' min='1' max='9' style={{width: 50}} />ª série do Ensino fundamental, nos termos da Lei 9.394/46, artigo 24, inciso II, alí­nea â€œbâ€.
      </P>


      <H2>Informações Complementares</H2>
      <P>
        - Formas de acesso<br />
      </P>
      <Center>
        <Input name='formasAcesso1' type='checkbox' value='ClassificaçÃ£o' onChange={changeField} />Classificação (Progressão Plena)<br />                              
        <Input name='formasAcesso2' type='checkbox' value='ReclassificaçÃ£o' onChange={changeField} />Reclassificação<br />
      </Center>
      <P>
        Dispensa em:<br />
      </P>
      <Center>
        Educação Fí­sica <Input name='edFisica' type='radio' value='Sim' onChange={changeField} />  Sim <Input name='edFisica' type='radio' value='Não' onChange={changeField} />  Não /
        Ensino Religioso <Input name='ensReligioso' type='radio' value='Sim' onChange={changeField} />  Sim <Input name='ensReligioso' type='radio' value='Não' onChange={changeField} />  Não 
      </Center>

      <H2>Observações:</H2>
      <Textarea name='obs' rows='5' onChange={changeField} style={{width: '100%'}}>
        {campos.nome && campos.nome[0]}
      </Textarea>
    </div>

    <div className='pag2'>
      <H1>EDUCANDÁRIO SAGRADO CORAÇÃO DE JESUS</H1>
      <PH1>
      Educação Infantil e Ensino Fundamental do 1º ao 9º Ano<br />
      CNPJ 05.061.549/0001-00<br />
      Cadastro Escolar: Nº P 364.002<br />
      Autorização portaria SE Nº 1874<br />
      Publicado no D.O. de 20/03/03
      </PH1>

      <H2>Histórico Escolar do Ensino Fundamental</H2>
      <P>
      Certificamos que, {campos.nome && campos.nome[0]}<br />
      Filh{genero} de: {campos.pai && campos.pai[0]}<br />
      E de: {campos.mae && campos.mae[0]}<br />
      Nascid{genero} em: {campos.datanasc && campos.datanasc[0]}<br />
      Natural de:	{campos.natural && campos.natural[0]}		UF: {campos.uf && campos.uf[0]}<br />
      Concluiu a {campos.serie && campos.serie[0]}ª série do Ensino fundamental, nos termos da Lei 9.394/46, artigo 24, inciso II, alí­nea.
      </P>


      <H2>Informações Complementares</H2>
      <P>
      - Formas de acesso<br />
      Classificação (Progressão Plena)<br />                              
      Reclassificação<br />

      Dispensa em:<br />
      Educação Fí­sica ()  Sim ()  Não / Ensino Religioso (   ) Sim  ( x ) Não
      </P>

      <H2>Observações:</H2>
      <P>{campos.obs && campos.obs[0]}</P>
    </div>
  </>
  );
};
 
export default DocHistorico;

