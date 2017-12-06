import React from 'react';
import { PanelHeader } from './PanelHeader';
import Toggle from '../../ui/Toggle';
import {observer, inject} from 'mobx-react';

const OtherPanel = ({otherStore}) => {

    const handleChange = (event) => {
        otherStore.setShowOnlySelectedCategoryTagInHitlist(event.target.checked);
    };

    const { sentimentRange, showOnlySelectedCategoryTagInHitlist: showTags } = otherStore;

    return (
        <div>
            <PanelHeader name="Other"/>
            <div className="panel-checkable-item" style={{padding: '.7rem'}}>
                <span style={{fontSize: '1.3rem', width: '80%', display: 'inline-block'}}>Show Only Selected Category Tag In Hitlist</span>
                <Toggle
                    style={{float: 'right'}}
                    defaultChecked={showTags}
                    onChange={handleChange} />
            </div>
            <p>Sentiment Range</p>
        </div>
    )
};

export default inject('otherStore')(observer(OtherPanel));