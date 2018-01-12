import React from 'react';
import {PanelHeader} from './PanelHeader';
import Toggle from '../../ui/Toggle';
import {observer, inject} from 'mobx-react';
import {SENTIMENT_MAX_VALUE, SENTIMENT_MIN_VALUE} from '../../../constants';
import MultiSlider from '../../ui/MultiSlider';

const OtherPanel = ({otherStore, designStore}) => {

    const handleToggleChange = (event) => {
        otherStore.setShowOnlySelectedCategoryTagInHitlist(event.target.checked);
    };

    const handleRangeChange = (values) => {
        let sentiment = {
            Negative: [],
            Neutral: [],
            Positive: []
        };

        let current = SENTIMENT_MIN_VALUE;

        for (let i = 0; i < values[0]; i++) {
            sentiment.Negative.push(current);
            current++;
        }
        for (let i = 0; i < values[1]; i++) {
            sentiment.Neutral.push(current);
            current++;
        }
        for (let i = 0; i < SENTIMENT_MAX_VALUE - values[0] - values[1]; i++) {
            sentiment.Positive.push(current);
            current++;
        }

        console.log(values);
        console.log(sentiment);

        otherStore.setSentimentRange(sentiment);
    };

    const {
        showOnlySelectedCategoryTagInHitlist: showTags,
        defaultValue,
        sentimentRange
    } = otherStore;

    const {design} = designStore;
    const colors = [design.negativeColor, design.neutralColor, design.positiveColor];
    const values = [sentimentRange.Negative.length, sentimentRange.Neutral.length, sentimentRange.Positive.length < 2 ? 0 : sentimentRange.Positive.length - 1];

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
                    <MultiSlider
                        colors={colors}
                        values={values}
                        onChange={handleRangeChange}
                    />
                </div>
            </div>
        </div>
    )
};

export default inject('otherStore', 'designStore')(observer(OtherPanel));