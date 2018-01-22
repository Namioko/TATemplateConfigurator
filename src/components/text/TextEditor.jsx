import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {buildConfig} from '../../utils/config';
import {extractVariable} from '../../utils/parser';
import {validColor} from '../../utils/validation';
import {DEFAULT_COLORS, DEFAULT_AREAS_PALETTE} from '../../constants/design';
import CodeMirror from 'react-codemirror';
import {SENTIMENT_MAX_VALUE, SENTIMENT_MIN_VALUE} from '../../constants';
import {QUESTION_PROPERTIES} from '../../utils/validation';
import UndoIcon from '../../assets/img/icons/ic_undo.svg';
import RedoIcon from '../../assets/img/icons/ic_redo.svg';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';

@inject('questionStore', 'designStore', 'otherStore', 'componentStore')
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

        if (sessionStorage.getItem('historyLength') == null
            || sessionStorage.getItem('currentHistoryIndex') == null) {
            sessionStorage.setItem('historyLength', 0);
            sessionStorage.setItem('currentHistoryIndex', -1);
        }
        this.pushTextToHistory(this.state.text);
    }

    handleTextChange = (newValue) => {
        this.setState({text: newValue, isChanged: true});
    };

    handleApplyChanges = (text) => {
        const {questionStore, designStore, otherStore, componentStore} = this.props;

        otherStore.setShowOnlySelectedCategoryTagInHitlist(
            !!extractVariable(text, "ShowOnlySelectedCategoryTagInHitlist")
        );

        designStore.setCustomerLogo(
            extractVariable(text, "CustomerLogo").toString()
        );

        const configDesign = extractVariable(text, "Design");

        if (!configDesign) {
            designStore.setDefaultDesign();
        } else {
            for (let key in DEFAULT_COLORS) {
                const color = configDesign[key];

                designStore.setProperty(
                    key,
                    (color != null && validColor(color)) ? color : DEFAULT_COLORS[key]
                );
            }

            for (let key in DEFAULT_AREAS_PALETTE) {
                const color = configDesign['areasPalette'][key];

                designStore.setAreaPalette(
                    key,
                    (color != null && validColor(color)) ? color : DEFAULT_AREAS_PALETTE[key]
                );
            }

            const chartPalette = configDesign['chartPalette'];
            if (chartPalette == null || !(chartPalette instanceof Array)) {
                designStore.setProperty('chartPalette', []);
            } else {
                let validChartColors = [];

                for (let i = 0; i < chartPalette.length; i++) {
                    if (validColor(chartPalette[i])) {
                        validChartColors.push(chartPalette[i]);
                    }
                }

                designStore.setProperty('chartPalette', validChartColors);
            }
        }

        const questions = extractVariable(text, "TAQuestions");
        questionStore.clearQuestions();

        for (let i = 0; i < questions.length; i++) {
            const currentQuestion = questions[i];
            let newQuestion = {};

            for (let key in QUESTION_PROPERTIES) {
                let propertyType = QUESTION_PROPERTIES[key].type;

                if (propertyType === Number && !(typeof currentQuestion[key] === "number")) {
                    newQuestion[key] = (QUESTION_PROPERTIES[key].defaultValue != null) ? QUESTION_PROPERTIES[key].defaultValue : 0;
                } else if (propertyType === String && !(typeof currentQuestion[key] === "string")) {
                    newQuestion[key] = (QUESTION_PROPERTIES[key].defaultValue != null) ? QUESTION_PROPERTIES[key].defaultValue : "";
                } else if (propertyType === Array && !(currentQuestion[key] instanceof Array)) {
                    newQuestion[key] = (QUESTION_PROPERTIES[key].defaultValue != null) ? QUESTION_PROPERTIES[key].defaultValue : [];
                } else {
                    newQuestion[key] = currentQuestion[key];
                }
            }

            questionStore.addQuestionToEnd(newQuestion);
        }

        if (questions.length > 0) {
            componentStore.changeCurrentQuestion(0);
        } else {
            componentStore.resetCurrentQuestion();
        }

        const sentimentRange = extractVariable(text, "SentimentRange");
        const sentiment = {
            Negative: [],
            Neutral: [],
            Positive: []
        };

        let current = SENTIMENT_MIN_VALUE;
        for (let i = 0; i < sentimentRange.Negative.length; i++) {
            sentiment.Negative.push(current);
            current++;
        }

        for (let i = 0; i < sentimentRange.Neutral.length; i++) {
            sentiment.Neutral.push(current);
            current++;
        }

        const count = SENTIMENT_MAX_VALUE - current + 1;
        for (let i = 0; i < count; i++) {
            sentiment.Positive.push(current);
            current++;
        }

        otherStore.setSentimentRange(sentiment);

        alert("Changes successfully applied!");
        this.setState({isChanged: false});

        this.pushTextToHistory(text);
    };

    pushTextToHistory = (text) => {
        const currentHistoryIndex = Number(sessionStorage.getItem('currentHistoryIndex'));
        const historyLength = Number(sessionStorage.getItem('historyLength'));

        const previousText = sessionStorage.getItem(`config${currentHistoryIndex}`);
        if (previousText === text) {
            return;
        }

        sessionStorage.setItem(`config${currentHistoryIndex + 1}`, text);
        sessionStorage.setItem('currentHistoryIndex', currentHistoryIndex + 1);
        if (currentHistoryIndex + 1 === historyLength) {
            sessionStorage.setItem('historyLength', currentHistoryIndex + 2);
        }
    };

    handleUndo = () => {
        const currentHistoryIndex = Number(sessionStorage.getItem('currentHistoryIndex'));
        if (currentHistoryIndex - 1 >= 0) {
            const undoText = sessionStorage.getItem(`config${currentHistoryIndex - 1}`);
            this.setState({text: undoText});
            sessionStorage.setItem('currentHistoryIndex', currentHistoryIndex - 2);
            this.handleApplyChanges(undoText);
        }
    };

    handleRedo = () => {
        const currentHistoryIndex = Number(sessionStorage.getItem('currentHistoryIndex'));
        const historyLength = Number(sessionStorage.getItem('historyLength'));
        if (currentHistoryIndex + 1 < historyLength) {
            const redoText = sessionStorage.getItem(`config${currentHistoryIndex + 1}`);
            this.setState({text: redoText, isChanged: true});
            sessionStorage.setItem('currentHistoryIndex', currentHistoryIndex);
            this.handleApplyChanges(redoText);
        }
    };

    render() {

        const {text, isChanged} = this.state;

        return (
            <div className="editor-container">
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

                <div className="text-editor__buttons">
                    <div>
                        <img
                            src={UndoIcon}
                            alt="Undo"
                            className="green-button text-editor_img-button"
                            title="Undo"
                            onClick={this.handleUndo}
                        />
                        <img
                            src={RedoIcon}
                            alt="Redo"
                            className="green-button text-editor_img-button"
                            title="Redo"
                            onClick={this.handleRedo}
                        />
                    </div>

                    <button
                        className={"green-button"}
                        style={{visibility: isChanged ? "visible" : "hidden"}}
                        onClick={() => {this.handleApplyChanges(this.state.text)}}>
                        Apply changes
                    </button>
                </div>
            </div>
        )
    }
}

export default TextEditor;