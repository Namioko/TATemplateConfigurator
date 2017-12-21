import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {buildConfig} from '../../utils/config';
import CodeMirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

@inject('questionStore', 'designStore', 'otherStore')
@observer
class TextEditor extends Component {

    constructor(props) {
        super(props);

        const {questions} = this.props.questionStore;
        const {design, customerLogo} = this.props.designStore;
        const {showOnlySelectedCategoryTagInHitlist, sentimentRange} = this.props.otherStore;

        const textConfig = buildConfig({
            questions: questions,
            design: design,
            otherParams: {
                customerLogo: customerLogo,
                showOnlySelectedCategoryTagInHitlist: showOnlySelectedCategoryTagInHitlist,
                sentimentRange: sentimentRange
            }
        });

        this.state = {
            text: textConfig
        };
    }

    handleTextChange = (newValue) => {
        this.setState({text: newValue});
    }

    render() {
        return (
            <CodeMirror
                className="text-editor"
                value={this.state.text}
                onChange={this.handleTextChange}
                options={{
                    mode: 'javascript'
                }}
            />
        )
    }
}

export default TextEditor;