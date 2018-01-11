import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {buildConfig} from '../../utils/config';
import {extractVariable} from '../../utils/parser';
import {validColor} from '../../utils/validation';
import {DEFAULT_COLORS, DEFAULT_AREAS_PALETTE} from '../../constants/design';
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
        const {questionStore, designStore, otherStore} = this.props;

        otherStore.setShowOnlySelectedCategoryTagInHitlist(
            !!extractVariable(this.state.text, "ShowOnlySelectedCategoryTagInHitlist")
        );

        designStore.setCustomerLogo(
            extractVariable(this.state.text, "CustomerLogo").toString()
        );

        const configDesign = extractVariable(this.state.text, "Design");

        if(!configDesign) { 
            designStore.setDefaultDesign();
        } else {
            for (let key in DEFAULT_COLORS) {
                const color = configDesign[key];

                designStore.setProperty(
                    key,
                    (color != null && validColor(color)) ? color : DEFAULT_COLORS[key]
                );
            }

            for(let key in DEFAULT_AREAS_PALETTE) {
                const color = configDesign['areasPalette'][key];

                designStore.setAreaPalette(
                    key,
                    (color != null && validColor(color)) ? color : DEFAULT_AREAS_PALETTE[key]
                );
            }

            const chartPalette = configDesign['chartPalette'];
            if(chartPalette == null || !(chartPalette instanceof Array)) {
                designStore.setProperty('chartPalette', []);
            } else {
                let validChartColors = [];

                for(let i = 0; i < chartPalette.length; i++) {
                    if(validColor(chartPalette[i])) {
                        validChartColors.push(chartPalette[i]);
                    }
                }

                designStore.setProperty('chartPalette', validChartColors);
            }
        }

        //TODO: validate values and save in store
        const questions = extractVariable(this.state.text, "TAQuestions");
        for(let i = 0; i < questions.length; i++) {
            const currentQuestion = questions[i];
            //validation and save...
        }

        const sentimentRange = extractVariable(this.state.text, "SentimentRange");

        console.log(questions);
        console.log(sentimentRange);       
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