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
              <i className='sideBar__icone fas fa-school' /> Escola
            </a>
          </li>
          <li className='sideBar__itensMenu'>
            <a href='/dashboard/alunos' className='sideBar__link'>
              <i className='sideBar__icone fas fa-address-card' /> Alunos
              <div className='efeito-menu' />
            </a>
          </li>
          <li className='sideBar__itensMenu'>
            <a href='/dashboard/turmas' className='sideBar__link'>
              <div className='efeito-menu' />
              <i className='sideBar__icone fas fa-user-friends' /> Turmas
            </a>
          </li>
          <li className='sideBar__itensMenu'>
            <a href='/dashboard/disciplinas' className='sideBar__link'>
              <div className='efeito-menu' />
              <i className='sideBar__icone fas fa-book-reader' /> Disciplinas
            </a>
          </li>
          <li className='sideBar__itensMenu'>
            <a href='/dashboard/professores' className='sideBar__link'>
              <div className='efeito-menu' />
              <i className='sideBar__icone fas fa-chalkboard-teacher' />{' '}
              Professores
            </a>
          </li>
          <li className='sideBar__itensMenu'>
            <a href='/dashboard/avisos' className='sideBar__link'>
              <div className='efeito-menu' />
              <i className='sideBar__icone fas fa-info-circle' /> Avisos
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
