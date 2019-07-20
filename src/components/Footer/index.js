import React from 'react';
import { Col, Row } from 'reactstrap';

const Footer = () => {
  return (
    <footer className='col-md-12'>
      <Row>
        <Col md={4}>
          <h3>(81) 99128-2508</h3>
        </Col>
        <Col md={4}>
          <h3>Institucional</h3>
          <a href='/sobrenos'>Sobre Nós</a>
          <br />
          <a href='/ensino'>Ensino</a>
        </Col>
        <Col md={4}>
          <h3>Acesso Rápido</h3>
          <a href='/contato'>Contato</a>
          <br />
          <a href='/circularesprovas'>Circulares / Provas</a>
        </Col>
      </Row>
      <div className='container text-left' style={{ paddingTop: 50 }}>
        2019 © sagradocoracaovertentes.com.br | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
