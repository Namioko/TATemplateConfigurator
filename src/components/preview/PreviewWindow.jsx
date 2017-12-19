import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

@inject('designStore')
@observer
class PreviewWindow extends Component {

    onLoad = () => {
        const {design} = this.props.designStore;

        const css = `body,html{background: ${design['positiveColor']};color: #00f; }`;
        const frameHead = document.getElementById('preview-frame').contentWindow.document.head;
        const styleTag = frameHead.getElementsByTagName('style')[0];

        if (styleTag.styleSheet){
            styleTag.styleSheet.cssText = css;
        } else {
            styleTag.appendChild(document.createTextNode(css));
        }
        console.log(styleTag); 
    } 

    render() {
        return (
            <div className="window-wrapper">
                <iframe id="preview-frame" src="/preview/noname.html" onLoad={this.onLoad}/>
            </div>
        )
    }
}

export default PreviewWindow;