import React from 'react';
import {observer, inject} from 'mobx-react';
import LeftIcon from '../../../../assets/img/icons/ic_arrow_left.svg';

const WindowPrevButton = inject('componentStore')(observer(({componentStore}) => {
    const {currentQuestionIndex, changeCurrentQuestion} = componentStore;

    const handleClick = () => {
        if (currentQuestionIndex > 0) {
            changeCurrentQuestion({chosenQuestionIndex: currentQuestionIndex - 1});
        }
    };

    return (
        <img
            src={LeftIcon}
            alt="Prev"
            className="gray-button window-buttons_arrow window-buttons_arrow-prev"
            onClick={handleClick}/>
    )
}));

export default WindowPrevButton;