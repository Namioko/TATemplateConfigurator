import React from 'react';
import ReactDom from 'react-dom';
import Configurator from "./components/configurator";
import {Provider} from 'mobx-react';
import * as stores from './stores';

ReactDom.render(
    <Provider {...stores}>
        <Configurator/>
    </Provider>,
    document.getElementById('root'));