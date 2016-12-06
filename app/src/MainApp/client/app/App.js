/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Box, Container, Flex } from '../app/components';
import favicon from '../../../common/app/favicon';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
// Styles
import '../stylesheets/initial.less';


const styles = {
  container: {
    minHeight: '100vh',
  },
  page: {
    flex: 1,
  },
};

// v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
const bootstrap4Metas: any = [
    { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  },
  {
    'http-equiv': 'x-ua-compatible',
    content: 'ie=edge',
  },
];

const App = ({ currentLocale, children }) => (
        <Container>
            <Helmet
              htmlAttributes={{ lang: currentLocale }}
              meta={[
                ...bootstrap4Metas,
                {
                  name: 'description',
                  content: `Starter kit for universal full-fledged React apps. One stack
          for browser, mobile, server.',`,
                },
                ...favicon.link,
              ]}
              link={[
                ...favicon.link,
              ]}
            />
            <Flex flexColumn style={styles.container}>
                <Header />
                {children}
                <Footer />
            </Flex>
        </Container>
);
App.propTypes = {
  currentLocale: React.PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default connect(
        (state: State) => ({
          currentLocale: state.intl.currentLocale,
        }),
)(App);
