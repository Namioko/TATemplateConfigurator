import React from 'react';
import {observer, inject} from 'mobx-react';

const PreviewWindow = ({designStore}) => {
    return (
        <div className="window-wrapper">
            <div>Preview Windows</div>
        </div>
    )
}

export default inject('designStore')(observer(PreviewWindow));