import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Row, Col, Nav, Navbar, NavbarBrand, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import linksMessages from '../../../common/app/linksMessages';
import { LinkContainer } from 'react-router-bootstrap';
import { Meteor } from 'meteor/meteor';


const Header = () => {
    //static propTypes = {
    //    viewer: PropTypes.object,
    //};

    //const { viewer } = this.props;
    const loginPath =  Meteor.user() ? "/signout" : "/signin"
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">AdminIDE</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav pullRight>
                <LinkContainer to="/">
                    <NavItem eventKey={1}>
                        <FormattedMessage {...linksMessages.home} />
                    </NavItem>
                </LinkContainer>
                <LinkContainer to="/docs">
                    <NavItem eventKey={2}>
                        <FormattedMessage {...linksMessages.docs} />
                    </NavItem>
                </LinkContainer>
                <LinkContainer to={loginPath}>
                    <NavItem eventKey={3}>
                        { Meteor.user() ? <FormattedMessage {...linksMessages.signOut } /> : <FormattedMessage {...linksMessages.signIn } /> }
                    </NavItem>
                </LinkContainer>
            </Nav>
        </Navbar>
    )
}

export default Header;