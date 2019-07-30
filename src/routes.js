import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import SobreNos from './pages/SobreNos';
import Calendario from './pages/Calendario';
import Contato from './pages/Contato';
import Eventos from './pages/Eventos';
import Ensino from './pages/Ensino';
import Login from './pages/Login';

import Dashboard from './pages/dashboard';
import Escola from './pages/dashboard/Escola';
import Alunos from './pages/dashboard/Alunos';
import Turmas from './pages/dashboard/Turmas';
import Disciplinas from './pages/dashboard/Disciplinas';
import Professores from './pages/dashboard/Professores';
import Avisos from './pages/dashboard/Avisos';
import CircularesProvas from './pages/CircularesProvas';

import Aluno from './pages/aluno/home';
import AlunoCalendario from './pages/aluno/calendario';
import AlunoFaltas from './pages/aluno/faltas';
import AlunoNotas from './pages/aluno/notas';
import AlunoProvas from './pages/aluno/provas';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/sobrenos' component={SobreNos} />
      <Route path='/calendario' component={Calendario} />
      <Route path='/contato' component={Contato} />
      <Route path='/eventos' component={Eventos} />
      <Route path='/circularesprovas' component={CircularesProvas} />
      <Route path='/ensino' component={Ensino} />
      <Route path='/login' component={Login} />

      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute path='/dashboard/escola' component={Escola} />
      <PrivateRoute path='/dashboard/alunos' component={Alunos} />
      <PrivateRoute path='/dashboard/turmas' component={Turmas} />
      <PrivateRoute path='/dashboard/disciplinas' component={Disciplinas} />
      <PrivateRoute path='/dashboard/professores' component={Professores} />
      <PrivateRoute path='/dashboard/avisos' component={Avisos} />

      <PrivateRoute exact path='/aluno' component={Aluno} />
      <PrivateRoute path='/aluno/calendario' component={AlunoCalendario} />
      <PrivateRoute path='/aluno/faltas' component={AlunoFaltas} />
      <PrivateRoute path='/aluno/notas' component={AlunoNotas} />
      <PrivateRoute path='/aluno/provas' component={AlunoProvas} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
