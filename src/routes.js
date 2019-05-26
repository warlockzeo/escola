import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Calendario from './pages/Calendario';
import Contato from './pages/Contato';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Escola from './pages/dashboard/Escola';
import Alunos from './pages/dashboard/Alunos';
import Turmas from './pages/dashboard/Turmas';
import Disciplinas from './pages/dashboard/Disciplinas';
import Professores from './pages/dashboard/Professores';
import Avisos from './pages/dashboard/Avisos';

const Routes = props => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/sobre' component={Sobre} />
      <Route path='/calendario' component={Calendario} />
      <Route path='/contato' component={Contato} />
      <Route path='/login' component={Login} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute path='/dashboard/escola' component={Escola} />
      <PrivateRoute path='/dashboard/alunos' component={Alunos} />
      <PrivateRoute path='/dashboard/turmas' component={Turmas} />
      <PrivateRoute path='/dashboard/disciplinas' component={Disciplinas} />
      <PrivateRoute path='/dashboard/professores' component={Professores} />
      <PrivateRoute path='/dashboard/avisos' component={Avisos} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
