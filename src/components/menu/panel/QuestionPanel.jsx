import React from 'react';
import {PanelHeader} from './PanelHeader';
import Question from './Question';
import {observer, inject} from 'mobx-react';

const QuestionPanel = () => {
    return (
        <div className="menu__panel">
            <PanelHeader name="TAQuestions"/>
            <MenuQuestionAddButton/>
            <QuestionList/>
        </div>
    );
};

const MenuQuestionAddButton = inject('componentStore', 'questionStore')(observer(({componentStore, questionStore}) => {
    const handleClick = () => {
        componentStore.changeCurrentQuestion({chosenQuestionIndex: componentStore.currentQuestionIndex});
        questionStore.addQuestion({index: componentStore.currentQuestionIndex});
    };

    return (
        componentStore.currentQuestionIndex < 0 &&
        <div className="add-button">
            <button className="green-button"
                    onClick={handleClick}>
                + Add
            </button>
        </div>
    )
}));

const QuestionList = inject('componentStore', 'questionStore')(observer(({componentStore, questionStore}) => {
    const {questions} = questionStore;

    return (
        componentStore.currentQuestionIndex >= 0 &&
        <div className='menu__panel_content'>
            {questions.map((item, key) => (
                <Question key={key} index={key}/>
            ))}
        </div>
    )
}));

export default observer(QuestionPanel);