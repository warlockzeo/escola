import React from 'react';
import TopMenu from '../TopMenu';
import MenuAluno from '../MenuAluno';
import DashboardSideMenu from '../DashboardSideMenu';

const Header = props => {
  return window.location.href.includes('dashboard') ? (
    <DashboardSideMenu
      logout={props.logout}
      nivelAcesso={props.nivelAcessoUsuarioLogado}
    />
  ) : window.location.href.includes('aluno') ? (
    <MenuAluno logout={props.logout} />
  ) : (
    <TopMenu user={props.nomeUsuarioLogado} logout={props.logout} />
  );
};

export default Header;
