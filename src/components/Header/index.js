import React from 'react';
import TopMenu from '../TopMenu';
import DashboardSideMenu from '../DashboardSideMenu';

const Header = props => {
  return window.location.href.includes('dashboard') ? (
    <DashboardSideMenu
      logout={props.logout}
      nivelAcesso={props.nivelAcessoUsuarioLogado}
    />
  ) : (
    <TopMenu user={props.nomeUsuarioLogado} logout={props.logout} />
  );
};

export default Header;
