import React from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';

const SubmenuHeader = (props) => {
    return (
        <div className={'menu__submenu_header'}>
            {props.name}
        </div>
    )
};

SubmenuHeader.propTypes = {
    name: PropTypes.string
};

export default observer(SubmenuHeader);