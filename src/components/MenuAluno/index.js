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

class MenuAluno extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const greetings = this.props.usuario && (
      <span className='greetings'>Bem vindo {this.props.usuario}</span>
    );

    return (
      <header className='header'>
        <Navbar expand='md' fixed='top'>
          <NavbarBrand href='/aluno/'>
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
                <NavLink href='/aluno/'>Início</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/aluno/notas/'>Notas</NavLink>
              </NavItem>

              <NavItem>
                {localStorage.getItem('user') && (
                  <NavLink href='#' onClick={this.props.logout}>
                    <div className='efeito-menu' />
                    <i className='fas fa-power-off' /> Logout
                  </NavLink>
                )}
              </NavItem>
            </Nav>
          </Collapse>
          {greetings}
        </Navbar>
      </header>
    );
  }
}

export default MenuAluno;
