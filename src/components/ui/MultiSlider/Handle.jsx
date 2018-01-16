import React from "react";
import objectAssign from "object-assign";
import useTouches from "./useTouches";

export default class Handle extends React.Component {
  state = {
    hover: false,
  };

  hoverIn = () =>
    this.setState({
      hover: true,
    });

  hoverOut = () =>
    this.setState({
      hover: false,
    });

  render() {
    const hover = this.state.hover;
    let {active, x, y, size, strokeWidth, bg, color, value} = this.props;

    let events = objectAssign(
      useTouches()
        ? {}
        : {
            onMouseEnter: this.hoverIn,
            onMouseLeave: this.hoverOut,
          },
      this.props.events
    );

    return (
      <g {...events}>
        <circle key="1" cx={x} cy={y} r={size} fill={color} />
        <circle
          key="2"
          opacity={active ? 0 : hover ? 0.8 : 1}
          cx={x}
          cy={y}
          r={size - strokeWidth}
          fill={bg}
        />
        <text x={x - 2} y={y + 36} fontSize="13px">{value}</text>
      </g>
    );
  }
}