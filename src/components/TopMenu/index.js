import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import './styles.css';

class TopMenu extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <header>
        <Navbar expand='md' fixed='top'>
          <NavbarBrand href='/'>
            <img
              src='/assets/images/logo-scj.png'
              alt='Educandário Sagrado Coração de Jesus'
              className='logo'
            />
          </NavbarBrand>
          <button
            type='button'
            className='navbar-toggler'
            onClick={this.toggle}
          >
            <span className='icon-bar'>
              <i className='fas fa-bars' />
            </span>
          </button>

          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <NavLink href='/'>
                  <div className='efeito-menu' />
                  <i className='fas fa-home' /> Início
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/sobrenos'>
                  <div className='efeito-menu' />
                  Sobre Nós
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/ensino'>
                  <div className='efeito-menu' />
                  Ensino
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/circularesprovas'>
                  <div className='efeito-menu' />
                  Circulares / Provas
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/contato'>
                  <div className='efeito-menu' />
                  Contato
                </NavLink>
              </NavItem>
              <NavItem>
                {this.props.user ? (
                  <NavLink href='#' onClick={this.props.logout}>
                    <div className='efeito-menu' />
                    <i className='fas fa-power-off' /> Logout
                  </NavLink>
                ) : (
                  <NavLink href='/login'>
                    <div className='efeito-menu' />
                    <i className='fas fa-key' /> Login
                  </NavLink>
                )}
              </NavItem>
            </Nav>
          </Collapse>
          {this.props.user && (
            <div className='headerNomeAluno'>
              Olá {this.props.user}{' '}
              {localStorage.getItem('userAccessLevel') >= 90 ? (
                <a href='/dashboard/'>- Painel de Controle</a>
              ) : (
                <a href='/aluno/'>- Meu painel</a>
              )}
            </div>
          )}
        </Navbar>
      </header>
    );
  }
}

export default TopMenu;
