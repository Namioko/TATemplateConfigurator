import React from 'react';
import {Link} from 'react-router-dom';
import {buildConfig} from '../utils/config';
import * as stores from '../stores';
import {QUESTION_WINDOW} from '../constants';

const NavBar = () => {

    const download = () => {

        const {changeCurrentQuestion} = stores.componentStore;
        const {questions, indexOfFirstQuestionErrors} = stores.questionStore;
        const {design, customerLogo} = stores.designStore;
        const {showOnlySelectedCategoryTagInHitlist, sentimentRange} = stores.otherStore;

        if(indexOfFirstQuestionErrors >= 0) {
            alert('You have some errors in the configuration!');
            changeCurrentQuestion({chosenQuestionIndex: indexOfFirstQuestionErrors});
            return;
        }

        const textConfig = buildConfig({
            questions: questions,
            design: design,
            otherParams: {
                customerLogo: customerLogo,
                showOnlySelectedCategoryTagInHitlist: showOnlySelectedCategoryTagInHitlist,
                sentimentRange: sentimentRange
            }
        });

        //TODO: Don't work in IE
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textConfig));
        element.setAttribute('download', 'TAConfig.js');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    return (
        <div className={'navbar'}>
            <Link to="/" className="navbar__item">Design</Link>
            <Link to="/text" className="navbar__item"  onClick={() => {
                stores.componentStore.targetWindow = QUESTION_WINDOW;
            }}>Text editor</Link>
            <button className="green-button navbar_download-btn" onClick={download}>Download
                configuration
            </button>
        </div>
    )
};

export default NavBar;