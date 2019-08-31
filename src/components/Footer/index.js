import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

const Footer = props => {
  return window.location.href.includes('dashboard') ? (
    <footer>2019 © sagradocoracaovertentes.com.br | All Rights Reserved</footer>
  ) : (
    <footer className=''>
      <div
        className='text-left'
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 30
        }}
      >
        <Row style={{ width: '100%' }}>
          <Col md={4}>
            <h3 className='text-left'>{props.telefones}</h3>
          </Col>
          <Col md={4}>
            <h3 className='text-left'>Institucional</h3>
            <a href='/sobrenos'>Sobre Nós</a>
            <br />
            <a href='/ensino'>Ensino</a>
          </Col>
          <Col md={4}>
            <h3 className='text-left'>Acesso Rápido</h3>
            <a href='/contato'>Contato</a>
            <br />
            <a href='/circularesprovas'>Circulares / Provas</a>
          </Col>
        </Row>
      </div>
      <div
        className='text-left'
        style={{
          padding: 20,
          backgroundColor: '#9c5035',
          color: '#ffffff'
        }}
      >
        2019 © sagradocoracaovertentes.com.br | All Rights Reserved
      </div>
    </footer>
  );
};

const mapStateToProps = state => ({
  ...state.escola.data
});

export default connect(mapStateToProps)(Footer);
