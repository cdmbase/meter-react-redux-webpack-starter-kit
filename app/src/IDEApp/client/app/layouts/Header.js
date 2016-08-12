import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Row, Col, Nav, Navbar, NavbarBrand, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import linksMessages from '../../../common/app/linksMessages';
import { LinkContainer } from 'react-router-bootstrap';


const Header = () => {
    //static propTypes = {
    //    viewer: PropTypes.object,
    //};

        //const { viewer } = this.props;

        return (
            <div id="nav_header">
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">React-Bootstrap</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} href="#">Link</NavItem>
                        <NavItem eventKey={2} href="#">Link</NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
}

export default Header;