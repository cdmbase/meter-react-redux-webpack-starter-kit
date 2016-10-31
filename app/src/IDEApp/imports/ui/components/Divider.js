import {PropTypes, Component} from 'react';


export default class Divider extends Component {
    static propTypes = {
        height: PropTypes.number.isRequired
    };

    render () {
        let divStyle = {
            height: this.props.height + 'px',
            width: '100%'
        };
        return (
            <div style={divStyle}></div>
        )
    };
}