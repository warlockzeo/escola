import React, { Component } from 'react';

import './styles.css';

class DashBoardSideMenu extends Component {
  render() {
    return (
      <aside className='sidebar'>
        <a href='/dashboard/'>
          <img
            src='/assets/images/logo-scj.png'
            alt='Educandário Sagrado Coração de Jesus'
            className='sideBar__logo'
          />
        </a>

        <ul className='sideBar__menu'>
          <li className='sideBar__itensMenu'>
            <a href='/dashboard/escola' className='sideBar__link'>
              <div className='efeito-menu' />
              <i className='sideBar__icone fas fa-info-circle' /> Escola
            </a>
          </li>
          <li className='sideBar__itensMenu'>
            <a href='/dashboard/alunos' className='sideBar__link'>
              <i className='sideBar__icone far fa-calendar-alt' /> Alunos
              <div className='efeito-menu' />
            </a>
          </li>
          <li className='sideBar__itensMenu'>
            <a href='/dashboard/turmas' className='sideBar__link'>
              <div className='efeito-menu' />
              <i className='sideBar__icone far fa-address-book' /> Turmas
            </a>
          </li>
          <li className='sideBar__itensMenu'>
            <a href='/dashboard/disciplinas' className='sideBar__link'>
              <div className='efeito-menu' />
              <i className='sideBar__icone far fa-address-book' /> Disciplinas
            </a>
          </li>
          <li className='sideBar__itensMenu'>
            <a href='/dashboard/professores' className='sideBar__link'>
              <div className='efeito-menu' />
              <i className='sideBar__icone far fa-address-book' /> Professores
            </a>
          </li>
          <li className='sideBar__itensMenu'>
            <a href='/dashboard/avisos' className='sideBar__link'>
              <div className='efeito-menu' />
              <i className='sideBar__icone far fa-address-book' /> Avisos
            </a>
          </li>
          <li className='sideBar__itensMenu'>
            <span onClick={this.props.logout} className='sideBar__link'>
              <div className='efeito-menu' />
              <i className='sideBar__icone fas fa-power-off' /> Logout
            </span>
          </li>
        </ul>
      </aside>
    );
  }
}

export default DashBoardSideMenu;
