import propTypes from 'prop-types';
import React, {Component} from 'react';
import Track from "./Track";
import Handle from "./Handle";

class RangeSlider extends Component {
    constructor(props) {
        super(props);

        const {min, max, values, padding} = this.props;
        const width = max - min + 1;

        let points = [];
        points.push(padding);
        points = points.concat(values.map((item, index) => padding + values[index] / width * 100));
        points.push(100 - padding);

        this.state = {
            points,
            isStartedMoving: false
        }
    }

    render() {
        const {colors, y, lineWidth, handleSize, handleStrokeWidth} = this.props;

        return (
            <svg className="range-slider">
                {
                    this.state.points.map((item, index) => {
                        if (index + 1 < this.state.points.length) {
                            return <Track key={index} fromX={`${this.state.points[index]}%`}
                                          toX={`${this.state.points[index + 1]}%`}
                                          y={y} width={lineWidth} color={colors[index]}/>
                        }
                    })
                }
                {
                    this.state.points.length - 2 === 2
                        ? this.state.points.map((item, index) => {
                            if (index === 1) {
                                return <Handle key={index} x={`${this.state.points[index]}%`} y={y}
                                               size={handleSize} strokeWidth={handleStrokeWidth}
                                               stroke={colors[0]}/>
                            }
                            if (index === 2) {
                                return <Handle key={index} x={`${this.state.points[index]}%`} y={y}
                                               size={handleSize} strokeWidth={handleStrokeWidth}
                                               stroke={colors[2]}/>
                            }
                        })
                        : this.state.points.map((item, index) => {
                            if (index !== 0 && index !== this.state.points.length - 1) {
                                return <Handle key={index} x={`${this.state.points[index]}%`} y={y}
                                               size={handleSize} strokeWidth={handleStrokeWidth}
                                               stroke={colors[index]}/>
                            }
                        })
                }
            </svg>
        );
    }
}

RangeSlider.propTypes = {
    min: propTypes.number.isRequired,
    max: propTypes.number.isRequired,
    values: propTypes.arrayOf(propTypes.number).isRequired,
    colors: propTypes.arrayOf(propTypes.string).isRequired,
    padding: propTypes.number,
    y: propTypes.number,
    lineWidth: propTypes.number,
    handleSize: propTypes.number,
    handleStrokeWidth: propTypes.number
};

RangeSlider.defaultProps = {
    padding: 5,
    y: 30,
    lineWidth: 5,
    handleSize: 7,
    handleStrokeWidth: 2
};

export default RangeSlider;