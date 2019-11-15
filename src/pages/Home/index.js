import React, {Component} from 'react';
import { Row, Col, Card } from 'reactstrap';

import Slideshow from '../../components/Slides';
import urlBaseApi from '../../components/config';

class Home extends Component {
  state = {
    slides: []
  };

  loadBanners = () => {
    fetch(`${urlBaseApi}banners`)
    .then(response => response.json())
    .then(responseJson => {
      const slides = responseJson
        .filter(banner => banner.posicao === 'carrossel')
        .map(banner => `/assets/banners/${banner.urlImage}`);

      const bannerAluno = responseJson
        .filter(banner => banner.posicao === 'portalAluno')
        .map(banner => `/assets/banners/${banner.urlImage}`);

      const bannerProfessor = responseJson
        .filter(banner => banner.posicao === 'portalProfessor')
        .map(banner => `/assets/banners/${banner.urlImage}`);

      this.setState({slides, bannerAluno, bannerProfessor});
    })
    .catch(() => this.setState({
      slides:[], 
      bannerAluno: '', 
      bannerProfessor: ''
    }));
  };

  componentDidMount() {
    this.loadBanners();
  };

  render(){
    return (
      <Col md={12}>
        <Row>
          <div md={12} className='slides'>
            <Slideshow images={this.state.slides} />
          </div>
        </Row>
        <Row style={{ marginTop: 20, marginBottom: 20 }}>
          <Col md={4}>
            <Card
              className='wow bounceInLeft animated'
              data-wow-delay='0.1s'
              body
              style={{
                backgroundImage: `url(${this.state.bannerAluno})`
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
                backgroundImage: `url(${this.state.bannerProfessor})`
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
                backgroundImage: 'url(/assets/images/calendario.jpg)'
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
}
export default Home;
