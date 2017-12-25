import React, { Component } from 'react';
import { PanelHeader } from './PanelHeader';
import {observer, inject} from 'mobx-react';
import ColorEditor from './ColorEditor';
import ColorArray from './ColorArray';

@inject('designStore')
@observer
class DesignPanel extends Component {

    onChangeColor = (name, color) => {
        this.props.designStore.setProperty(name, color.color);
    };

    onChangeChartColors = (colors) => {
        console.log("change" + colors);
        this.props.designStore.setProperty('chartPalette', colors);
    };

    onChangeAreaPalette = (area, color) => {
        this.props.designStore.setAreaPalette(area, color.color);
    };

    onChangeLogoUrl = (e) => {
         this.props.designStore.setCustomerLogo(e.target.value);
    };

    render() {

        const { design } = this.props.designStore;
        const logo = this.props.designStore.customerLogo;
    
        return (
            <div className="menu__panel">
                <PanelHeader name="Design"/>
                <div className="menu__panel_content">
                    <div className="logo-container" style={{ display: 'inline-block', float: 'left', padding: '.3rem 1rem' }}>
                        <span style={{ 'fontSize': '1.3rem' }}>Customer Logo</span>
                        <br/> {/* If image url is invalid - show error*/}
                        <input type="text" className="form-control" value={logo} placeholder="Logo url" style={{ float: 'left', width: '93%' }} onChange={this.onChangeLogoUrl}/>
                        {(logo) ?
                        (
                            <img alt="Logo preview" src={logo} className="menu__panel_design-logo"/>
                        ) : (
                            ""
                        )}
                    </div>
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
                    <span className="menu__panel_design-subtitle">Chart Palette</span>
                    <ColorArray onChange={this.onChangeChartColors} colors={design['chartPalette'].slice()}/>
                    <span className="menu__panel_design-subtitle">Areas Palette</span>
                    <ColorEditor 
                        value={design['areasPalette']['Priority Issues']} 
                        label="Priority Issues"
                        onChangeColor={(color) => this.onChangeAreaPalette('Priority Issues', color)}
                    />
                    <ColorEditor 
                        value={design['areasPalette']['Strength']} 
                        label="Strength"
                        onChangeColor={(color) => this.onChangeAreaPalette('Strength', color)}
                    />
                    <ColorEditor 
                        value={design['areasPalette']['Monitor and Improve']} 
                        label="Monitor and Improve"
                        onChangeColor={(color) => this.onChangeAreaPalette('Monitor and Improve', color)}
                    />
                    <ColorEditor 
                        value={design['areasPalette']['Maintain']} 
                        label="Maintain"
                        onChangeColor={(color) => this.onChangeAreaPalette('Maintain', color)}
                    />
                </div>
            </div>
        )
    }
};

export default DesignPanel;