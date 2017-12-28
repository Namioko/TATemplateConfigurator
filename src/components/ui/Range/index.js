import propTypes from 'prop-types';
import React, {Component} from 'react';
import RangeSlider from './RangeSlider';

class Range extends Component {
    render() {
        const {colors, values, max, min} = this.props;

        return (
            <RangeSlider colors={colors} values={values} max={max} min={min}/>
        );
    }
}

Range.propTypes = {
    colors: propTypes.arrayOf(propTypes.string),
    values: propTypes.arrayOf(propTypes.number).isRequired,
    max: propTypes.number.isRequired,
    min: propTypes.number.isRequired,

};

export default Range;