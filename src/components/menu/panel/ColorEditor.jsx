import React from 'react';
import ColorPicker from 'rc-color-picker';
import PropTypes from 'prop-types';
import 'rc-color-picker/assets/index.css';

const ColorEditor = (props) => {

    const { value, label, onChangeColor } = props;

    return (
        <div style={{ display: 'inline-block', float: 'left', padding: '.3rem 1rem' }}>
            {(label) ? (
                <span style={{ 'fontSize': '1.3rem', 'marginBottom': '1.3rem' }}>{label}</span>
            ) : ''}
            <input type="text" className="form-control" value={value} style={{ float: 'left' }} readOnly/>
            <div style={{ float: 'left', 'marginLeft': '1rem' }}>
                <ColorPicker
                    animation="slide-up"
                    color={value}
                    onChange={onChangeColor}
                />
            </div>
        </div>
    )
}

ColorEditor.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChangeColor: PropTypes.func.isRequired
};

export default ColorEditor;