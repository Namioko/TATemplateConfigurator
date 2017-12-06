import React from 'react';
import {PanelHeader} from './PanelHeader';
import Question from './Question';
import {observer, inject} from 'mobx-react';

const QuestionPanel = ({componentStore}) => {
    return (
        <div className="menu__panel">
            <PanelHeader name="TAQuestions"/>
            {
                componentStore.currentQuestionIndex < 0
                    ? <MenuQuestionAddButton/>
                    : <QuestionList/>
            }
        </div>
    );
};

const MenuQuestionAddButton = inject('componentStore', 'questionStore')(observer(({componentStore, questionStore}) => {
    const onClickHandler = () => {
        questionStore.addQuestion({index: componentStore.currentQuestionIndex});
        componentStore.changeCurrentQuestion({chosenQuestionIndex: componentStore.currentQuestionIndex});
    };

    return (
        <div className="add-button">
            <button className="green-button"
                    onClick={onClickHandler}>
                + Add
            </button>
        </div>
    )
}));

const QuestionList = inject('questionStore')(observer(({questionStore}) => {
    const {questions} = questionStore;

    return (
        <div className='menu__panel_content'>
            {questions.map((item, key) => (
                <Question key={key} index={key}/>
            ))}
        </div>
    )
}));

export default inject('componentStore')(observer(QuestionPanel));