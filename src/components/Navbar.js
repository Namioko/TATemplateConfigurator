import React from 'react';
import {Link} from 'react-router-dom';
import {buildConfig} from '../utils/config';
import * as stores from '../stores';

const NavBar = () => {

    const download = () => {

        const {questions} = stores.questionStore;
        const {design, customerLogo} = stores.designStore;
        const {showOnlySelectedCategoryTagInHitlist, sentimentRange} = stores.otherStore;

        const textConfig = buildConfig({
            questions: questions,
            design: design,
            otherParams: {
                customerLogo: customerLogo,
                url: showOnlySelectedCategoryTagInHitlist,
                sentimentRange: sentimentRange
            }});

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
            <Link to="/text" className="navbar__item">Text editor</Link>
            <button className="green-button" style={{float: 'right', marginTop: '.6rem', marginRight: '1rem'}} onClick={download}>Download configuration</button>
        </div>
    )
};

export default NavBar;