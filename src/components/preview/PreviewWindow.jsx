import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {observe} from 'mobx';

@inject('designStore')
@observer
class PreviewWindow extends Component {

    constructor(props) {
        super(props);

        observe(this.props.designStore.design, (change) => {
            this.setStyles();
        });

    }

    setStyles = () => {
        const {design} = this.props.designStore;

        const css = `body,html{background: ${design['positiveColor']};color: #00f; }`;
        const frameHead = document.getElementById('preview-frame').contentWindow.document.head;
        const styleTag = frameHead.getElementsByTagName('style')[0];

        if (styleTag.styleSheet){
            styleTag.styleSheet.cssText = css;
        } else {
            while(styleTag.hasChildNodes()){
                styleTag.removeChild(styleTag.lastChild);
            }

            styleTag.appendChild(document.createTextNode(css));
        }
    } 

    render() {
        return (
            <div className="window-wrapper">
                <iframe id="preview-frame" src="/preview/noname.html" onLoad={this.setStyles}/>
            </div>
        )
    }
}

export default PreviewWindow;