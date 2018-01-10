import React from 'react';
import ColorPicker from 'rc-color-picker';
import PropTypes from 'prop-types';
import 'rc-color-picker/assets/index.css';

const ColorEditor = (props) => {

    const { value, label, onChangeColor } = props;

    const textValue = value.replace("#", '');

    return (
        <div style={{ display: 'inline-block', float: 'left', padding: '.3rem 1rem' }}>
            {(label) ? (
                <span style={{ 'fontSize': '1.3rem', 'float': 'left', 'width': '100%', 'marginBottom': '.5rem' }}>{label}</span>
            ) : ''}
            <div class="input-group" style={{'width': '15rem', 'float': 'left'}}>
                <div class="input-group-prepend">
                    <div class="input-group-text" style={{'fontSize': '1.2rem'}}>#</div>
                </div>
                <input type="text" className="form-control" value={textValue} style={{ float: 'left', fontSize: '1.2rem', width: '10rem' }} readOnly/>
            </div>
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