import React from 'react';
import PropTypes from 'prop-types';

export const PanelHeader = (props) => {
    return (
        <div className='menu__submenu_header'>
            {props.name}
        </div>
    )
};

PanelHeader.propTypes = {
    name: PropTypes.string
};