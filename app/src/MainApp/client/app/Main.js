/* @flow */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import R from 'ramda';
import { Grid, Row, Col } from 'react-bootstrap';
import { Match, ThemeProvider } from '../../../common/app/components';
import { Box, Container, Flex } from '../app/components';
import favicon from '../../../common/app/favicon';
import start from '../../../common/app/start';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import * as themes from './themes';
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

const Main = ({ currentLocale, currentTheme, children }) => (
    <ThemeProvider key={currentTheme} theme={themes[currentTheme] || themes.initial}>
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
    </ThemeProvider>
);
Main.propTypes = {
  currentLocale: React.PropTypes.string.isRequired,
  currentTheme: React.PropTypes.string,
  children: PropTypes.object.isRequired,
};

export default R.compose(
    connect(
        (state: State) => ({
          currentLocale: state.intl.currentLocale,
          currentTheme: state.themes.currentTheme,
        }),
    ),
    start,
)(Main);
