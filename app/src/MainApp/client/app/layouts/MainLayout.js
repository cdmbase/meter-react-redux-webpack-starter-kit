import React, { Component } from 'react';
import Footer from './Footer';
import Header from './Header';

export default class MainLayout extends Component {
    render() {
        return (
            <div>
                <Header />
                <h2>Main Layout</h2>
                {this.props.children}
                <Footer />
            </div>

        )
    }
}