import React from 'react';
import {observer} from 'mobx-react';
import QuestionSubmenu from "./questions/questions-submenu";

const Menu = () => {
    return (
        <div className={'menu'}>
            <QuestionSubmenu/>
        </div>
    )
};

export default observer(Menu);