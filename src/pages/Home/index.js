import React from 'react';
import { Row, Col, Card } from 'reactstrap';

import Slideshow from '../../components/Slides';

const images = [
  '/assets/banners/banner1.jpg',
  '/assets/banners/banner2.jpg',
  '/assets/banners/banner3.jpg',
  '/assets/banners/banner4.jpg'
];

const Home = () => {
  return (
    <Col md={12}>
      <Row>
        <div md={12} className='slides'>
          <Slideshow images={images} />
        </div>
      </Row>
      <Row style={{ marginTop: 20, marginBottom: 20 }}>
        <Col md={4}>
          <Card
            className='wow bounceInLeft animated'
            data-wow-delay='0.1s'
            body
            style={{
              backgroundImage: 'url(/assets/images/equipe.jpg)'
            }}
          >
            <a href='/login'>
              <div className='home__bloco'>
                <span className='home__bloco__texto'>Portal do Aluno</span>
              </div>
            </a>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className='wow bounceInLeft animated'
            data-wow-delay='0.3s'
            body
            style={{
              backgroundImage: 'url(/assets/images/calendario.jpg)'
            }}
          >
            <a href='/login'>
              <div className='home__bloco'>
                <span className='home__bloco__texto'>Portal do Professor</span>
              </div>
            </a>
          </Card>
        </Col>
        <Col md={4}>
          <Card
            className='wow bounceInLeft animated'
            data-wow-delay='0.5s'
            body
            style={{
              backgroundImage: 'url(/assets/images/eventos.jpg)'
            }}
          >
            <a href='/circularesprovas'>
              <div className='home__bloco'>
                <span className='home__bloco__texto'>
                  Informativos e Provas
                </span>
              </div>
            </a>
          </Card>
        </Col>
      </Row>
    </Col>
  );
};

export default Home;
