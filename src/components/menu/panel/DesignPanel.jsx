import React, { Component } from 'react';
import { PanelHeader } from './PanelHeader';
import {observer, inject} from 'mobx-react';
import ColorEditor from './ColorEditor';

@inject('designStore')
@observer
class DesignPanel extends Component {

    onChangeColor = (name, color) => {
        this.props.designStore.setProperty(name, color.color);
    };

    render() {

        const { design } = this.props.designStore;

        return (
            <div className="menu__panel">
                <PanelHeader name="Design"/>
                <div className="menu__panel_content">
                    <ColorEditor 
                        value={design['positiveColor']} 
                        label="Positive Color"
                        onChangeColor={(color) => this.onChangeColor('positiveColor', color)}
                    />
                    <ColorEditor 
                        value={design['neutralColor']} 
                        label="Neutral Color"
                        onChangeColor={(color) => this.onChangeColor('neutralColor', color)}
                    />
                    <ColorEditor 
                        value={design['negativeColor']} 
                        label="Negative Color"
                        onChangeColor={(color) => this.onChangeColor('negativeColor', color)}
                    />
                    <ColorEditor 
                        value={design['backgroundColor']} 
                        label="Background Color"
                        onChangeColor={(color) => this.onChangeColor('backgroundColor', color)}
                    />
                    <ColorEditor 
                        value={design['headerBackgroundColor']} 
                        label="Header Background Color"
                        onChangeColor={(color) => this.onChangeColor('headerBackgroundColor', color)}
                    />
                    <ColorEditor 
                        value={design['headerTextColor']} 
                        label="Header Text Color"
                        onChangeColor={(color) => this.onChangeColor('headerTextColor', color)}
                    />
                    <ColorEditor 
                        value={design['lightPrimaryColor']} 
                        label="Light Primary Color"
                        onChangeColor={(color) => this.onChangeColor('lightPrimaryColor', color)}
                    />
                    <ColorEditor 
                        value={design['buttonTextColor']} 
                        label="Button Text Color"
                        onChangeColor={(color) => this.onChangeColor('buttonTextColor', color)}
                    />
                    <ColorEditor 
                        value={design['buttonHoverColor']} 
                        label="Button Hover Color"
                        onChangeColor={(color) => this.onChangeColor('buttonHoverColor', color)}
                    />
                    <ColorEditor 
                        value={design['buttonMainColor']} 
                        label="Button Main Color"
                        onChangeColor={(color) => this.onChangeColor('buttonMainColor', color)}
                    />
                    <ColorEditor 
                        value={design['tableColumnColor']} 
                        label="Table Column Color"
                        onChangeColor={(color) => this.onChangeColor('tableColumnColor', color)}
                    />
                    <ColorEditor 
                        value={design['primaryTextColor']} 
                        label="Primary Text Color"
                        onChangeColor={(color) => this.onChangeColor('primaryTextColor', color)}
                    />
                    <ColorEditor 
                        value={design['secondaryTextColor']} 
                        label="Secondary Text Color"
                        onChangeColor={(color) => this.onChangeColor('secondaryTextColor', color)}
                    />
                    <ColorEditor 
                        value={design['dividerColor']} 
                        label="Divider Color"
                        onChangeColor={(color) => this.onChangeColor('dividerColor', color)}
                    />
                    <ColorEditor 
                        value={design['lightDividerColor']} 
                        label="Light Divider Color"
                        onChangeColor={(color) => this.onChangeColor('lightDividerColor', color)}
                    />
                    <ColorEditor 
                        value={design['disabledTextColor']} 
                        label="Disabled Text Color"
                        onChangeColor={(color) => this.onChangeColor('disabledTextColor', color)}
                    />
                </div>
            </div>
        )
    }
};

export default DesignPanel;