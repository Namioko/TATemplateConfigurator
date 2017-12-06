import React from 'react';
import {observer, inject} from 'mobx-react';

const PreviewWindow = ({designStore}) => {
    return (
        <div>Preview Windows</div>
    )
}

export default inject('designStore')(observer(PreviewWindow));