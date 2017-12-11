import React from 'react';
import NavBar from './Navbar';
import Menu from './menu';
import {observer, inject} from 'mobx-react';
import WindowsWrapper from './windows/WindowWrapper';
import DevTools from 'mobx-react-devtools';
import PreviewWindow from './preview/PreviewWindow';
import {QUESTION_WINDOW,DESIGN_WINDOW} from '../constants';

const Configurator = ({componentStore}) => {

    //to separate component and refactoring
    const {targetWindow} = componentStore;
    let window = null;

    if(targetWindow === QUESTION_WINDOW) {
        window = <WindowsWrapper/>;
    } else if(targetWindow === DESIGN_WINDOW) {
        window = <PreviewWindow/>;
    }

    return (
        <div className="configurator">
            <DevTools/>
            <NavBar/>
            <div className="main">
                <div className="content">
                    <Menu/>
                    {window}
                </div>
            </div>
        </div>
    )
};

export default inject('componentStore')(observer(Configurator));