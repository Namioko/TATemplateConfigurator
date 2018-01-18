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
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;
    const {questions, addQuestion} = questionStore;

    const handleClick = () => {
        changeCurrentQuestion(currentQuestionIndex);
        addQuestion({index: currentQuestionIndex});
    };

    return (
        (currentQuestionIndex < 0  || questions.length <= 0) &&
        <div className="add-button">
            <button className="green-button"
                    onClick={handleClick}
                    title="Add new question">
                + Add
            </button>
        </div>
    )
}));

const QuestionList = inject('componentStore', 'questionStore')(observer(({componentStore, questionStore}) => {
    const {currentQuestionIndex} = componentStore;
    const {questions} = questionStore;

    return (
        currentQuestionIndex >= 0 && questions.length > 0 &&
        <div className='menu__panel_content'>
            {questions.map((item, key) => (
                <Question key={key} index={key}/>
            ))}
        </div>
    )
}));

export default observer(QuestionPanel);