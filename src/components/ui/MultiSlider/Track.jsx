import React from "react";

export default class Track extends React.Component {
    render() {
        const {color, y, fromX, toX, lineWidth, leftLabel, rightLabel} = this.props;
        return (
            <g>
                <line
                    x1={fromX}
                    x2={toX}
                    y1={y}
                    y2={y}
                    strokeWidth={lineWidth}
                    stroke={color}
                    strokeLinecap="round"
                />
                <text className="range-slider_text" x={(leftLabel !== undefined) ? fromX - 5 : toX - 5} y={y + 36} fontSize="15px">
                    {
                        (leftLabel !== undefined) && leftLabel
                    }
                    {
                        (rightLabel !== undefined) && rightLabel
                    }
                </text>
            </g>
        );
    }
}