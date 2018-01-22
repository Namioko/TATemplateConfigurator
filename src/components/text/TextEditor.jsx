import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';
import {buildConfig} from '../../utils/config';
import {parseTextConfig} from '../../utils/text-parser';
import {DEFAULT_COLORS, DEFAULT_AREAS_PALETTE} from '../../constants/design';
import UndoIcon from '../../assets/img/icons/ic_undo.svg';
import RedoIcon from '../../assets/img/icons/ic_redo.svg';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/mode/javascript/javascript.js';

import {Controlled as CodeMirror} from 'react-codemirror2';

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

    handleTextChange = (editor, data, value) => {
        this.setState({text: value, isChanged: true});
    };

    handleApplyChanges = (text) => {
        const {questionStore, designStore, otherStore, componentStore} = this.props;
        const parsedConfig = parseTextConfig(text);

        otherStore.setShowOnlySelectedCategoryTagInHitlist(parsedConfig.ShowOnlySelectedCategoryTagInHitlist);
        otherStore.setSentimentRange(parsedConfig.SentimentRange);

        //Design
        designStore.setCustomerLogo(parsedConfig.CustomerLogo);
        for (let key in DEFAULT_COLORS) {
            designStore.setProperty(key, parsedConfig.Design[key]);
        }
        for (let key in DEFAULT_AREAS_PALETTE) {
            designStore.setAreaPalette(key, parsedConfig.Design['areasPalette'][key]);
        }
        designStore.setProperty('chartPalette', parsedConfig.Design['chartPalette']);

        //Questions
        questionStore.clearQuestions();
        for (let i = 0; i < parsedConfig.Questions.length; i++) {
            questionStore.addQuestionToEnd(parsedConfig.Questions[i]);
        }

        if (parsedConfig.Questions.length > 0) {
            componentStore.changeCurrentQuestion(0);
        } else {
            componentStore.resetCurrentQuestion();
        }

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

        const currentHistoryIndex = Number(sessionStorage.getItem('currentHistoryIndex'));
        const historyLength = Number(sessionStorage.getItem('historyLength'));

        return (
            <div className="editor-container">
                <CodeMirror
                    className="text-editor"
                    value={text}
                    onBeforeChange={this.handleTextChange}
                    options={{
                        mode: 'javascript',
                        lineNumbers: true,
                        styleActiveLine: true,
                        matchBrackets: true,
                        theme: 'mdn-like'
                    }}
                    autoSave={true}
                />

                <div className="text-editor__buttons">
                    <div>
                        <button
                            className="green-button text-editor_button"
                            title="Undo"
                            disabled={currentHistoryIndex < 1}
                            onClick={this.handleUndo}>
                            <img
                                className="text-editor_img-button"
                                src={UndoIcon}
                                alt="Undo"
                            />
                        </button>
                        <button
                            className="green-button text-editor_button"
                            title="Redo"
                            disabled={currentHistoryIndex >= historyLength - 1}
                            onClick={this.handleRedo}>
                            <img
                                className="text-editor_img-button"
                                src={RedoIcon}
                                alt="Redo"
                            />
                        </button>
                    </div>

                    <button
                        className={"green-button"}
                        style={{visibility: isChanged ? "visible" : "hidden"}}
                        onClick={() => {
                            this.handleApplyChanges(this.state.text)
                        }}>
                        Apply changes
                    </button>
                </div>
            </div>
        )
    }
}

export default TextEditor;