import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

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
                <NavLink href='/sobre'>A Escola</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/calendario'>Calendário</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/contato'>Contato</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href='/login'>Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default TopMenu;
