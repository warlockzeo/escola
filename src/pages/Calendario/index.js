import React from 'react';
import { Table } from 'reactstrap';

const calendario = [
  {
    id: 0,
    inicio: '10/06',
    fim: '14/06',
    atividade: 'Semana das atividdes Avaliativas II Bimestre',
    turmas: `Educação Fundamental I e II, 
    Educação Infantil`
  },
  {
    id: 1,
    inicio: '19/06',
    fim: '',
    atividade: 'Entrega de Cadernetas na Secretaria (Confecção das provas)',
    turmas: `Educação Fundamental I e II`
  },
  {
    id: 2,
    inicio: '21/06',
    fim: '',
    atividade: 'Educandrilha',
    turmas: `Educação Fundamental I e II, 
    Educação Infantil`
  },
  {
    id: 3,
    inicio: '28/06',
    fim: '',
    atividade: 'Plantão Pedagógico',
    turmas: `Educação Fundamental I e II, 
    Educação Infantil`
  },
  {
    id: 4,
    inicio: '28/06',
    fim: '',
    atividade: `ENTREGAS DOS RESULTADOS AOS PAIS (II BIMESTRE),
  TÉRMINO DO SEMESTRE,
  ENTREGA DOS CERTIFICADOS DE DESTAQUE I SEMESTRE`,
    turmas: `Educação Fundamental I e II, 
    Educação Infantil`
  },
  {
    id: 5,
    inicio: '01/07',
    fim: '19/07',
    atividade: 'Recesso Escolar(Não haverá aulas)',
    turmas: `Educação Fundamental I e II`
  },
  {
    id: 6,
    inicio: '22/07',
    fim: '',
    atividade: 'Reinício das atividades escolares',
    turmas: `Educação Fundamental I e II, 
    Educação Infantil`
  }
];

const Calendario = props => {
  return (
    <>
      <h1>Calendário</h1>
      <h2>
        <a href='/assets/files/CalendarioEscolar2019.pdf'>
          Cronograma Escolar 2019.PDF
        </a>
      </h2>

      <h2>Lista de atividades escolares</h2>
      <Table>
        <tr>
          <th>Turmas</th>
          <th>Inicio</th>
          <th>Fim</th>
          <th className='text-left'>Atividade</th>
        </tr>
        {calendario.map(data => (
          <tr key='data.id'>
            <td>{data.turmas}</td>
            <td>{data.inicio}</td>
            <td>{data.fim}</td>
            <td className='text-left'>{data.atividade}</td>
          </tr>
        ))}
      </Table>
    </>
  );
};

export default Calendario;
