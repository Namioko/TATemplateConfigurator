import React, {Component} from 'react';
import {inject} from 'mobx-react';
import {observe} from 'mobx';

@inject('designStore')
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
                <div className="question-window">
                    <div className="question-window_header">
                        <span className="question-window_header_title">Preview</span>
                    </div>
                    <div className="question-window__content">
                        <iframe id="preview-frame" src="/preview/noname.html" frameBorder="0" onLoad={this.setStyles} title="Preview"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default PreviewWindow;