import React from 'react';
import {observer, inject} from 'mobx-react';
import {buildConfig} from '../../utils/config';

const TextEditor = ({questionStore, designStore, otherStore}) => {

    const {questions} = questionStore;
    const {design, customerLogo} = designStore;

    const textConfig = buildConfig({
        questions: questions,
        design: design,
        otherParams: {
            customerLogo: customerLogo
        }});

    return (
        <textarea style={{width: '100%', height: '100%', marginTop: '4rem'}} value={textConfig}/>
    )
}

export default inject('questionStore', 'designStore', 'otherStore')(observer(TextEditor));