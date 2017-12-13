import React from 'react';
import Menu from './menu';
import {observer, inject} from 'mobx-react';
import WindowsWrapper from './windows/WindowWrapper';
import PreviewWindow from './preview/PreviewWindow';
import {QUESTION_WINDOW, DESIGN_WINDOW} from '../constants';

const Configurator = ({componentStore}) => {

    const {targetWindow} = componentStore;
    let window = null;

    if(targetWindow === QUESTION_WINDOW) {
        window = <WindowsWrapper/>;
    } else if(targetWindow === DESIGN_WINDOW) {
        window = <PreviewWindow/>;
    }

    return (
        <div className="content">
            <Menu/>
            {window}
        </div>
    )
};

export default inject('componentStore')(observer(Configurator));