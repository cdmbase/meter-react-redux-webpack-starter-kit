import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Row, Col, Nav, Navbar, NavbarBrand, NavItem} from 'react-bootstrap';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import linksMessages from '../../../common/app/linksMessages';
import { LinkContainer } from 'react-router-bootstrap';


class Header extends Component {
    //static propTypes = {
    //    viewer: PropTypes.object,
    //};

    render() {
        //const { viewer } = this.props;

        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">IDE</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <LinkContainer to="/">
                        <NavItem eventKey={1}>
                            <FormattedMessage {...linksMessages.home} />
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/pricing">
                        <NavItem eventKey={2}>
                            <FormattedMessage {...linksMessages.pricing} />
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to="/signUp">
                        <NavItem eventKey={3}>
                            <FormattedMessage {...linksMessages.signIn} />
                        </NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar>

        )
    }
}

export default Header;