import React from 'react';
import {PanelHeader} from './PanelHeader';
import Toggle from '../../ui/Toggle';
import {observer, inject} from 'mobx-react';
import Range from '../../ui/Range/index';
import {SENTIMENT_MAX_VALUE, SENTIMENT_MIN_VALUE} from '../../../constants';

const OtherPanel = ({otherStore, designStore}) => {

    const handleToggleChange = (event) => {
        otherStore.setShowOnlySelectedCategoryTagInHitlist(event.target.checked);
    };

    const handleRangeChange = ({values}) => {
        let sentiment = {
            Negative: [],
            Neutral: [],
            Positive: []
        };

        for (let i = SENTIMENT_MIN_VALUE; i <= values[0]; i++) {
            sentiment.Negative.push(i);
        }
        for (let i = values[0] + 1; i < values[1]; i++) {
            sentiment.Neutral.push(i);
        }
        for (let i = values[1]; i <= SENTIMENT_MAX_VALUE; i++) {
            sentiment.Positive.push(i);
        }

        otherStore.sentimentRange = sentiment;
    };

    const {
        showOnlySelectedCategoryTagInHitlist: showTags,
        defaultValue
    } = otherStore;

    const {design} = designStore;
    const colors = [design.negativeColor, design.neutralColor, design.positiveColor];

    return (
        <div>
            <PanelHeader name="Other"/>
            <div className="menu__panel_content">
                <div className="panel-checkable-item" style={{padding: '.7rem'}}>
                    <span style={{fontSize: '1.3rem', width: '80%', display: 'inline-block'}}>
                        Show Only Selected Category Tag In Hitlist
                    </span>
                    <Toggle
                        style={{float: 'right'}}
                        defaultChecked={showTags}
                        onChange={handleToggleChange}/>
                </div>
                <span className="menu__panel_design-subtitle">Sentiment Range</span>
                <div style={{padding: '.7rem'}}>
                    <Range colors={colors} values={defaultValue} min={SENTIMENT_MIN_VALUE} max={SENTIMENT_MAX_VALUE}/>
                </div>
            </div>
        </div>
    )
};

export default inject('otherStore', 'designStore')(observer(OtherPanel));