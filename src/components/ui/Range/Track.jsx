import propTypes from 'prop-types';
import React, {Component} from 'react';

class Track extends Component {
    render() {
        const {fromX, toX, y, width, color} = this.props;
        return (
            <line
                x1={fromX}
                x2={toX}
                y1={y}
                y2={y}
                strokeWidth={width}
                stroke={color}
                strokeLinecap="round"
            />
        );
    }
}

Track.propTypes = {
    fromX: propTypes.string.isRequired,
    toX: propTypes.string.isRequired,
    y: propTypes.number.isRequired,
    width: propTypes.number.isRequired,
    color: propTypes.string.isRequired
};

export default Track;