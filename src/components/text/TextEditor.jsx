import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {buildConfig} from '../../utils/config';
import {extractVariable} from '../../utils/parser';
import CodeMirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';

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
            text: textConfig,
            isChanged: false
        };
    }

    handleTextChange = (newValue) => {
        this.setState({text: newValue, isChanged: true});
    }

    handleApplyChanges = () => {
        //TODO: validate values and save in store
        console.log(extractVariable(this.state.text, "TAQuestions"));
        console.log(extractVariable(this.state.text, "CustomerLogo"));
        console.log(extractVariable(this.state.text, "ShowOnlySelectedCategoryTagInHitlist"));
        console.log(extractVariable(this.state.text, "Design"));
        console.log(extractVariable(this.state.text, "SentimentRange"));       
    }

    render() {

    const {text, isChanged} = this.state;

        return (
            <div style={{width: '100%', height: '100%'}}>
                <CodeMirror
                    className="text-editor"
                    value={text}
                    onChange={this.handleTextChange}
                    options={{
                        mode: 'javascript',
                        lineNumbers: true,
                        styleActiveLine: true,
                        matchBrackets: true,
                        theme: 'mdn-like'
                    }}
                />

                {(isChanged) && 
                    <button 
                        className="green-button" 
                        style={{position: "fixed", right: "2rem", bottom: "2rem", zIndex: '9999'}} 
                        onClick={this.handleApplyChanges}>
                        Apply changes
                    </button>
                }
            </div>
        )
    }
}

export default TextEditor;