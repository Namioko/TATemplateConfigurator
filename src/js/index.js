import React from 'react';
import ReactDom from 'react-dom';
import Configurator from "./components/configurator";
import {Provider} from 'mobx-react';
import * as stores from './stores';

[1, 2, 3, 4, 5].forEach((value) => {
    stores.configurationStore.addQuestion({index: value, TAQuestionName: `name${value}`});
});

ReactDom.render(
    <Provider {...stores}>
        <Configurator/>
    </Provider>,
    document.getElementById('root'));