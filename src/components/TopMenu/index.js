import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import {setLogout} from '../../store/actions/user';

import './styles.css';

class TopMenu extends Component {
  state = {
    isOpen: false,
    activeItem: window.location.pathname
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
              <NavItem
                className={this.state.activeItem === '/' ? 'nav-item__active' : ''}
              >
                <NavLink href='/'>
                  <div className='efeito-menu' />
                  <i className='fas fa-home' /> Início
                </NavLink>
              </NavItem>
              <NavItem
                className={
                  this.state.activeItem.includes('sobrenos') ?
                  'nav-item__active' : ''
                }
              >
                <NavLink href='/sobrenos'>
                  <div className='efeito-menu' />
                  Sobre Nós
                </NavLink>
              </NavItem>
              <NavItem
                className={
                  this.state.activeItem.includes('ensino') ? 'nav-item__active' : ''
                }
              >
                <NavLink href='/ensino'>
                  <div className='efeito-menu' />
                  Ensino
                </NavLink>
              </NavItem>
              <NavItem
                className={
                  this.state.activeItem.includes('circulares') ?
                  'nav-item__active' : ''
                }
              >
                <NavLink href='/circularesprovas'>
                  <div className='efeito-menu' />
                  Circulares / Provas
                </NavLink>
              </NavItem>
              <NavItem
                className={
                  this.state.activeItem.includes('contato') ?
                  'nav-item__active' : ''
                }
              >
                <NavLink href='/contato'>
                  <div className='efeito-menu' />
                  Contato
                </NavLink>
              </NavItem>
              <NavItem
                className={
                  this.state.activeItem.includes('login') ? 'nav-item__active' : ''
                }
              >
                {this.props.nomeUsuarioLogado ? (
                  <NavLink href='#' onClick={this.props.setLogout}>
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
          {this.props.nomeUsuarioLogado && (
            <div className='headerNomeAluno'>
              Olá {this.props.nomeUsuarioLogado}{' '}
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

const mapStateToProps = state => ({
  ...state.user.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({setLogout}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopMenu);