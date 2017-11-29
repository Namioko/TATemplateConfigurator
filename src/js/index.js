import ConfigurationStore from './store';
import React from 'react';
import ReactDom from 'react-dom';
import Configurator from "./components/configurator";
import {Provider} from 'mobx-react';

let configurationStore = new ConfigurationStore();

[1, 2, 3, 4, 5].forEach((value) => {
    configurationStore.addQuestion({index: value, TAQuestionName: `name${value}`});
});

ReactDom.render(
    (<Provider configurationStore={configurationStore}>
        <Configurator/>
    </Provider>),
    document.getElementById('root'));