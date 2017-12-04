import React from 'react';
import ReactDom from 'react-dom';
import Configurator from "./components/Configurator";
import {Provider} from 'mobx-react';
import * as stores from './stores';
import './assets/css/index.css';

ReactDom.render(
    <Provider {...stores}>
        <Configurator/>
    </Provider>,
    document.getElementById('root'));