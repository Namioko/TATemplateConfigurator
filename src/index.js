import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'mobx-react';
import * as stores from './stores';
import './assets/css/index.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';

ReactDom.render(
    <Provider {...stores}>
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));