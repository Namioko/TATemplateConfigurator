import React from 'react';
import {observer, inject} from 'mobx-react';
import RightIcon from '../../../../assets/img/icons/ic_arrow_right.svg';

const WindowNextButton = inject('componentStore', 'questionStore')(observer(({componentStore, questionStore}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;
    const {questions} = questionStore;

    const handleClick = () => {
        if (currentQuestionIndex < questions.length - 1) {
            changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex + 1});
        }
    };

    return (
        <img
            src={RightIcon}
            alt="Next"
            className="gray-button window-buttons_arrow window-buttons_arrow-next"
            onClick={handleClick}/>
    )
}));

export default WindowNextButton;