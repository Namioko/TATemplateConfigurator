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

        const negativeRange = Math.max(1, values[0]);
        const positiveRange = Math.max(1, values[2] + 1);
        const neutralRange = SENTIMENT_MAX_VALUE - (negativeRange + positiveRange) - 1;

        for (let i = 0; i <= negativeRange; i++) {
            sentiment.Negative.push(current);
            current++;
        }

        for (let i = 0; i < neutralRange; i++) {
            sentiment.Neutral.push(current);
            current++;
        }

        for (let i = 0; i < positiveRange; i++) {
            sentiment.Positive.push(current);
            current++;
        }

        console.log("\n");
        console.log("Handler values = " + values);
        console.log("Handler sentiment = " + JSON.stringify(sentiment));

        otherStore.setSentimentRange(sentiment);
    };

    const {
        showOnlySelectedCategoryTagInHitlist: showTags,
        defaultValue,
        sentimentRange
    } = otherStore;

    let first = sentimentRange.Negative.length;
    let third = sentimentRange.Positive.length;

    if(first === 1) {
        first = 0;
    } else {
        first--;
    }

    if(third === 1) {
        third = 0;
    } else {
        third--;
    }

    let second = SENTIMENT_MAX_VALUE - (third + first) - 1;

    const {design} = designStore;
    const colors = [design.negativeColor, design.neutralColor, design.positiveColor];
    const values = [first, second, third];

    console.log("Render values = " + values);
    //TODO: Congratulations! New bug - can not set (-4)
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