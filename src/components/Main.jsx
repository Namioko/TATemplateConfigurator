import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Configurator from './Configurator';
import TextEditor from './text/TextEditor';
import DevTools from 'mobx-react-devtools';
import NavBar from './Navbar';

const Main = () => {
    return (
        <div className="configurator">
            <DevTools/>
            <NavBar/>
            <div className="main">
                    <Switch>
                        <Route exact path='/' component={Configurator}/>
                        <Route path='/text' component={TextEditor}/>
                    </Switch>
            </div>
        </div>
    )
}

export default Main;