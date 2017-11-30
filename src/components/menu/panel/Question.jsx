import React from 'react';
import {observer, inject} from 'mobx-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Question = ({configurationStore, ...props}) => {
    const className = classNames({
        'menu__submenu_question': true,
        'menu__submenu_question-chosen': configurationStore.chosenQuestionIndex === props.index
    });

    return (
        <div className={className}
             onClick={() => configurationStore.changeCurrentQuestion({chosenQuestionIndex: props.index})}>
            <div className={'menu__submenu_question-icon'}/>
            {
                configurationStore.questions[props.index].TAQuestionName === undefined
                    ? `q${props.index}`
                    : configurationStore.questions[props.index].TAQuestionName
            }
        </div>
    )
};

Question.propTypes = {
    index: PropTypes.number
};

export default inject('configurationStore')(observer(Question));