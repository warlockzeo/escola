import React, {useState, useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CookieConsent from 'react-cookie-consent';

import getEscolaDados from '../store/actions/escola';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Routes from '../routes';

const Site = props => {
  const [ didMount, setDidMount ] = useState(false);
  useEffect(() => {
    if (!didMount) {
      props.getEscolaDados();
      setDidMount(true);
    }
  }, [didMount, props]);

  return (
    <div className='App'>
      <Header />
      <Routes />
      <Footer />
      <CookieConsent
        location="bottom"
        buttonText="Sure man!!"
        cookieName="myAwesomeCookieName2"
        style={{ background: '#2B373B' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
        expires={150}
      >
    This website uses cookies to enhance the user experience.{' '}
        <span style={{ fontSize: '10px' }}>
    This bit of text is smaller :O
        </span>
      </CookieConsent>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state.escola.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({getEscolaDados}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Site);