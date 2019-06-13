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
                <NavLink href='/sobre'>
                  <div className='efeito-menu' />
                  <i className='fas fa-info-circle' /> A Escola
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/calendario'>
                  <i className='far fa-calendar-alt' /> Calendário
                  <div className='efeito-menu' />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/contato'>
                  <div className='efeito-menu' />
                  <i className='far fa-address-book' /> Contato
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
              {this.props.user === 'admin' && (
                <a href='/dashboard/'>- Painel de Controle</a>
              )}
            </div>
          )}
        </Navbar>
      </header>
    );
  }
}

export default TopMenu;
