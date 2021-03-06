import React from 'react';
//import { Table } from 'reactstrap';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
}));

function createData(id, inicio, fim, atividade, turmas) {
  return { id, inicio, fim, atividade, turmas };
}

const rows = calendario.map(data =>
  createData(data.id, data.inicio, data.fim, data.atividade, data.turmas)
);

const Calendario = props => {
  const classes = useStyles();

  return (
    <>
      <h1>Calendário</h1>
      <h2>
        <a href='/assets/files/CalendarioEscolar2019.pdf'>
          Cronograma Escolar 2019.PDF
        </a>
      </h2>

      <h2>Lista de atividades escolares</h2>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Turmas</TableCell>
              <TableCell>Início</TableCell>
              <TableCell>Fim</TableCell>
              <TableCell>Atividade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component='th' scope='row'>
                  {row.turmas}
                </TableCell>
                <TableCell>{row.inicio}</TableCell>
                <TableCell>{row.fim}</TableCell>
                <TableCell>{row.atividade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default Calendario;
