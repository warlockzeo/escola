import React, {Component} from 'react';
import { Row, Col, Card } from 'reactstrap';

import Slideshow from '../../components/Slides';
import urlBaseApi from '../../components/config';

class Home extends Component {
  state = {
    banners: []
  };

  loadBanners = () => {
    fetch(`${urlBaseApi}banners`)
    .then(response => response.json())
    .then(responseJson => {
      const banners = responseJson.map(banner => {
        return(`/assets/banners/${banner.urlImage}`);
      });
      this.setState({banners});
    }).catch(()=>this.setState({banners:[]}));
  };

  componentDidMount() {
    this.loadBanners();
  };

  render(){
    return (
      <Col md={12}>
        <Row>
          <div md={12} className='slides'>
            <Slideshow images={this.state.banners} />
          </div>
        </Row>
        <Row style={{ marginTop: 20, marginBottom: 20 }}>
          <Col md={4}>
            <Card
              className='wow bounceInLeft animated'
              data-wow-delay='0.1s'
              body
              style={{
                backgroundImage: 'url(/assets/images/eventos.jpg)'
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
                backgroundImage: 'url(/assets/images/equipe.jpg)'
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
