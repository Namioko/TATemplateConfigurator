import React, {Component} from "react";
import propTypes from 'prop-types';

class Handle extends Component {
    render() {
        const {x, y, size, stroke, color, strokeWidth} = this.props;

        return (
            <circle cx={x} cy={y} r={size} stroke={stroke} strokeWidth={strokeWidth} fill={color}/>
        );
    }
}

Handle.propTypes = {
    x: propTypes.string.isRequired,
    y: propTypes.number.isRequired,
    size: propTypes.number.isRequired,
    color: propTypes.string,
    stroke: propTypes.string,
    strokeWidth: propTypes.number
};

Handle.defaultProps = {
    color: 'white',
    stroke: 'black',
    strokeWidth: 0
};

export default Handle;