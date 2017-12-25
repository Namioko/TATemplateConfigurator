import React from 'react';
import {PanelHeader} from './PanelHeader';
import Toggle from '../../ui/Toggle';
import {observer, inject} from 'mobx-react';
import MultiRange from '../../ui/Range/index';

const OtherPanel = ({otherStore}) => {

    const handleToggleChange = (event) => {
        otherStore.setShowOnlySelectedCategoryTagInHitlist(event.target.checked);
    };

    const handleRangeChange = ({result}) => {
        let sentiment = {
            Negative: [],
            Neutral: [],
            Positive: []
        };

        for (let i = result.min; i <= result.value[0]; i++) {
            sentiment.Negative.push(i);
        }
        for (let i = result.value[0] + 1; i < result.value[1]; i++) {
            sentiment.Neutral.push(i);
        }
        for (let i = result.value[1]; i <= result.max; i++) {
            sentiment.Positive.push(i);
        }

        otherStore.sentimentRange = sentiment;
    };

    const {
        showOnlySelectedCategoryTagInHitlist: showTags,
        defaultRangeMin,
        defaultRangeMax,
        defaultValue
    } = otherStore;

    return (
        <div>
            <PanelHeader name="Other"/>
            <div className="menu__panel_content">
                <div className="panel-checkable-item" style={{padding: '.7rem'}}>
                    <span style={{fontSize: '1.3rem', width: '80%', display: 'inline-block'}}>Show Only Selected Category Tag In Hitlist</span>
                    <Toggle
                        style={{float: 'right'}}
                        defaultChecked={showTags}
                        onChange={handleToggleChange}/>
                </div>
                <span className="menu__panel_design-subtitle">Sentiment Range</span>
                <div style={{padding: '.7rem'}}>
                    <MultiRange defaultMin={defaultRangeMin} defaultMax={defaultRangeMax}
                                  defaultValue={defaultValue} onChange={handleRangeChange}/>
                </div>
            </div>
        </div>
    )
};

export default inject('otherStore')(observer(OtherPanel));