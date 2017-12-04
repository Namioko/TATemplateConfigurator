import React, { Component } from 'react';
import { PanelHeader } from './PanelHeader';
import ColorPicker from 'rc-color-picker';
import {observer, inject} from 'mobx-react';
import 'rc-color-picker/assets/index.css';

@inject('designStore')
@observer
class DesignPanel extends Component {

    onChangeColor = (name, color) => {
        this.props.designStore.setProperty(name, color.color);
    }

    render() {

        const { design } = this.props.designStore;

        return (
            <div>
                <PanelHeader name="Design"/>
                <div style={{ padding: '1rem' }}>
                    <span style={{ 'fontSize': '1.3rem' }}>Positive Color</span>
                    <br/>
                    <input type="text" className="form-control" value={design['positiveColor']} style={{ float: 'left' }} readOnly/>
                    <div style={{ float: 'left', 'marginLeft': '1rem' }}>
                        <ColorPicker
                            animation="slide-up"
                            color={design['positiveColor']}
                            onChange={(color) => this.onChangeColor('positiveColor', color)}
                        />
                    </div>
                </div>
            </div>
        )
    }
};

export default DesignPanel;