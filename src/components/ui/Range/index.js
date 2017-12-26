import 'rc-slider/assets/index.css';
import propTypes from 'prop-types';

import React, {Component} from 'react';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class MultiRange extends Component {
    constructor(props) {
        super(props);

        let min = props.defaultMin;
        let max = props.defaultMax;

        if (props.min !== undefined) {
            min = props.min;
        }
        if (props.max !== undefined) {
            max = props.max;
        }

        if (props.min > props.defaultValue[0]) {
            min = props.defaultValue[0];
        }
        if (props.max < props.defaultValue[1]) {
            max = props.defaultValue[1];
        }

        this.state = {
            min,
            max
        };
    }

    onChange = (value) => {
        this.props.onChange({
            result: {
                value,
                min: this.state.min,
                max: this.state.max
            }
        });
    };

    //TODO: fix colors
    render() {
        return (
            <div className="range">
                <Range defaultValue={this.props.defaultValue} min={this.state.min} max={this.state.max}
                            onChange={this.onChange} tipFormatter={value => value} allowCross={false}
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