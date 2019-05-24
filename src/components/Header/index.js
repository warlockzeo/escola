import React from 'react';
import TopMenu from '../TopMenu';
import DashboardSideMenu from '../DashboardSideMenu';

const Header = props => {
  return !props.isLogged ||
    props.isLogged & (props.nivelAcessoUsuarioLogado === 1) ? (
    <TopMenu user={props.nomeUsuarioLogado} />
  ) : (
    <DashboardSideMenu />
  );
};

export default Header;
