import React from "react";
import Handle from "./Handle";
import Track from "./Track";
import useTouches from "./useTouches";
import PropTypes from "prop-types";

function step(min, max, x) {
    return Math.max(0, Math.min((x - min) / (max - min), 1));
}

export default class MultiSlider extends React.Component {
    static propTypes = {
        colors: PropTypes.arrayOf(PropTypes.string),
        values: PropTypes.arrayOf(PropTypes.number),
        onChange: PropTypes.func,
        width: PropTypes.number,
        height: PropTypes.number,
        padX: PropTypes.number,
        trackSize: PropTypes.number,
        handleSize: PropTypes.number,
        handleStrokeSize: PropTypes.number,
        handleInnerDotSize: PropTypes.number,
        bg: PropTypes.string,
        offset: PropTypes.number
    };

    static defaultProps = {
        colors: ["#000"], // define your own colors instead.
        handleSize: 12,
        padX: 20, // MUST be > handleSize to avoid clip issues
        width: 400,
        height: 80,
        trackSize: 7,
        handleStrokeSize: 4,
        handleInnerDotSize: 4,
        bg: "#fff",
        offset: -5
    };

    state = {
        down: null,
    };

    xForEvent(e) {
        let node = this.refs.root;
        let clientX = e.clientX;
        let m = node.getScreenCTM();
        let p = node.createSVGPoint();
        if (useTouches()) {
            // There is a bug in touch events and we need to compute the real clientX
            // http://stackoverflow.com/questions/5885808/includes-touch-events-clientx-y-scrolling-or-not
            clientX = e.pageX; // safer to start with pageX
            const stopAt = document.body.parentElement;
            while (node && node !== stopAt) {
                clientX -= node.scrollLeft;
                node = node.parentElement;
            }
        }
        p.x = clientX;
        p = p.matrixTransform(m.inverse());
        return p.x;
    }

    sum() {
        // (might optimize this computation on values change if costy)
        return this.props.values.reduce(function (a, b) {
            return a + b;
        });
    }

    x(value) {
        const width = this.props.width;
        const padX = this.props.padX;
        const sum = this.sum();
        return Math.round(padX + value * (width - 2 * padX) / sum);
    }

    reverseX(x) {
        const width = this.props.width;
        const padX = this.props.padX;
        const sum = this.sum();
        return sum * ((x - padX) / (width - 2 * padX));
    }

    concernedEvent = e => {
        const down = this.state.down;
        if (!useTouches()) {
            return e;
        } else {
            if (!down) return e.targetTouches[0];
            const touchId = down.touchId;
            const touches = e.changedTouches;
            for (let i = 0; i < touches.length; ++i) {
                if (touches[i].identifier === touchId) return touches[i];
            }
            return null;
        }
    };

    onHandleStart = (i, e) => {
        const event = this.concernedEvent(e);
        if (!event) return;
        e.preventDefault();
        this.setState({
            down: {
                touchId: event.identifier,
                x: this.xForEvent(event),
                controlled: i,
            },
        });
    };
    onHandleMove = e => {
        const event = this.concernedEvent(e);
        if (!event) return;
        e.preventDefault();
        const x = this.xForEvent(event);
        const valuePos = this.reverseX(x);
        const down = this.state.down;
        let values = this.props.values;
        const leftIndex = down.controlled - 1;
        const rightIndex = down.controlled;
        const leftValue = values[leftIndex];
        const rightValue = values[rightIndex];
        const w = leftValue + rightValue;
        let offsetLeft = 0;
        for (let i = 0; i < leftIndex; ++i)
            offsetLeft += values[i];
        const left = Math.round(w * step(offsetLeft, offsetLeft + w, valuePos));
        const right = w - left;

        if (left !== leftValue && right !== rightValue
            && ((leftIndex === 1 && left > 1) || (rightIndex === 1 && right > 1))) {
            values = [].concat(values);
            values[leftIndex] = left;
            values[rightIndex] = right;
            this.props.onChange(values);
        }
    };
    onHandleEnd = e => {
        const event = this.concernedEvent(e);
        if (!event) return;
        this.setState({
            down: null,
        });
    };
    onHandleAbort = e => {
        const event = this.concernedEvent(e);
        if (!event) return;
        this.setState({
            down: null,
        });
    };

    render() {
        const {down} = this.state;
        const {width, height, values, colors, trackSize, handleSize,
            handleStrokeSize, handleInnerDotSize, bg, offset} = this.props;
        const len = values.length;
        const centerY = height / 2;
        const touchEvents = useTouches();

        const tracks = [];
        let handles = [];
        let prev = 0;
        let prevColor = bg;
        for (let i = 0; i < len; ++i) {
            let value = values[i];
            let next = prev + value;
            let fromX = this.x(prev);
            let toX = this.x(next);
            let color = colors[i % colors.length];
            tracks.push(
                <Track
                    key={i}
                    color={color}
                    y={centerY}
                    lineWidth={trackSize}
                    fromX={fromX}
                    toX={toX}
                    leftLabel={(i === 0) ? prev + offset : undefined}
                    rightLabel={(i === len - 1) ? next + offset : undefined}
                />
            );
            if (i !== 0) {
                let handleEvents = {};
                if (touchEvents) {
                    if (!down) {
                        handleEvents.onTouchStart = this.onHandleStart.bind(null, i);
                    } else if (down.controlled === i) {
                        handleEvents.onTouchMove = this.onHandleMove;
                        handleEvents.onTouchEnd = this.onHandleEnd;
                        handleEvents.onTouchCancel = this.onHandleAbort;
                    }
                } else {
                    handleEvents.onMouseDown = this.onHandleStart.bind(null, i);
                }
                handles.push(
                    <Handle
                        key={i}
                        active={down && down.controlled === i}
                        x={fromX}
                        y={centerY}
                        bg={bg}
                        color={(i !== len - 1) ? prevColor : colors[colors.length - 1]}
                        strokeWidth={handleStrokeSize}
                        innerRadius={handleInnerDotSize}
                        size={handleSize}
                        events={handleEvents}
                        value={prev + offset}
                    />
                );
            }
            prev = next;
            prevColor = color;
        }
        // Specific case to avoid blocking the slider.
        if (len >= 3 && values[len - 2] === 0 && values[len - 1] === 0) {
            let reverseFromIndex;
            for (
                reverseFromIndex = len - 1;
                values[reverseFromIndex] === 0 && reverseFromIndex > 0;
                reverseFromIndex--
            ) ;
            let h1 = handles.slice(0, reverseFromIndex);
            let h2 = handles.slice(reverseFromIndex);
            h2.reverse();
            handles = h1.concat(h2);
        }
        let events = {};
        if (!touchEvents && down) {
            events.onMouseMove = this.onHandleMove;
            events.onMouseUp = this.onHandleEnd;
            events.onMouseLeave = this.onHandleAbort;
        }
        return (
            <svg
                ref="root"
                {...events}
                width="100%"
                height="100%"
                viewBox={"0 0 " + width + " " + height}
            >
                {tracks}
                {handles}
            </svg>
        );
    }
}