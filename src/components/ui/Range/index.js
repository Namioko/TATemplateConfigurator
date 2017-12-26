import 'rc-slider/assets/index.css';
import propTypes from 'prop-types';

import React, {Component} from 'react';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class MultiRange extends Component {
    constructor(props) {
        super(props);

        const offset = 6;

        this.state = {
            min: this.props.defaultValue[0] - offset,
            max: this.props.defaultValue[1] - offset,
            offset
        }
    }

    onChange = (value) => {
        this.props.onChange({
            value: [value[0] + this.state.offset, value[1] + this.state.offset]
        });
    };

    //TODO: fix colors
    render() {
        return (
            <div className="range">
                <Range defaultValue={[this.state.min, this.state.max]} onChange={this.onChange}
                       max={this.props.defaultMax - this.state.offset} min={this.props.defaultMin - this.state.offset}
                       tipFormatter={value => value} allowCross={false}
                       trackStyle={[{backgroundColor: 'red'}, {backgroundColor: 'green'}]}
                       handleStyle={[{backgroundColor: 'red'}, {backgroundColor: 'green'}]}
                       railStyle={{backgroundColor: 'grey'}}
                />
            </div>
        );
    }
}

MultiRange.propTypes = {
    defaultMin: propTypes.number.isRequired,
    defaultMax: propTypes.number.isRequired,
    min: propTypes.number,
    max: propTypes.number
};

export default MultiRange;