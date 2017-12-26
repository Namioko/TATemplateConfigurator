import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import Configurator from './Configurator';
import TextEditor from './text/TextEditor';
import NavBar from './Navbar';

export default class Main extends Component {

    componentDidMount() {
        window.addEventListener('beforeunload', this.keepOnPage);
    }
      
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.keepOnPage);
    }
      
    keepOnPage = (e) => {
        if(process.env.NODE_ENV !== "production") {
            return true;
        }

        var confirmationMessage = "Are you sure?";
        
        e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
        return confirmationMessage;              // Gecko, WebKit, Chrome <34
    }

    render() {
        return (
            <div className="configurator">
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
}