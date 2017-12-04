import React from 'react';
import {PanelHeader} from './PanelHeader';
import classNames from 'classnames';
import Question from './Question';
import {observer, inject} from 'mobx-react';

const QuestionPanel = ({configurationStore}) => {
    const firstAddButtonClassName = classNames({
        'menu__question-panel_add-button': true,
        'green-button': true,
        'hidden': configurationStore.chosenQuestionIndex >= 0
    });

    const {questions} = configurationStore;

    return ( /* TODO: fix height */
        <div style={{ height: "calc(100% - 3.5rem)" }}>
    {/*return (*/}
        {/*<div className={'menu__question-panel'}>*/}
            <PanelHeader name="TAQuestions"/>
            <button className={firstAddButtonClassName} //to separate component
                    onClick={() => configurationStore.addQuestion({index: configurationStore.chosenQuestionIndex})}>
                + Add
            </button> {/*on click to separate handler*/}
            <div className="question-list">
                {questions.map((item, key) => ( //to separate component
                    <Question key={key} index={key}/>
                ))}
            </div>
        </div>
    );
};

export default inject('configurationStore')(observer(QuestionPanel));