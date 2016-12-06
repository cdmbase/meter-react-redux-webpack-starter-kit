/* @flow */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from '../../../common/app/components';
import start from '../../../common/app/start';
import R from 'ramda';
import * as themes from './themes';


const Main = ({ currentTheme, children }) => (
  <ThemeProvider key={currentTheme} theme={themes[currentTheme] || themes.initial}>
    {children}
  </ThemeProvider>
);
Main.propTypes = {
  children: PropTypes.object.isRequired,
  currentTheme: React.PropTypes.string,
};

export default R.compose(
  connect(
    (state: State) => ({
      currentTheme: state.themes.currentTheme,
    }),
  ),
  start,
)(Main);
