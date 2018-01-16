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

        let negativeRange = values[0];
        let positiveRange = values[1];

        // if(values[0] === 0) {
        //     negativeRange++;
        //     neutralRange--;
        // }

        for (let i = SENTIMENT_MIN_VALUE; i <= negativeRange; i++) {
            sentiment.Negative.push(i);
        }
        for (let i = negativeRange + 1; i < positiveRange; i++) {
            sentiment.Neutral.push(i);
        }
        for (let i = positiveRange; i <= SENTIMENT_MAX_VALUE; i++) {
            sentiment.Positive.push(i);
        }

        console.log(values);
        console.log(sentiment);

        otherStore.setSentimentRange(sentiment);
    };

    const {
        showOnlySelectedCategoryTagInHitlist: showTags,
        sentimentRange
    } = otherStore;

    const negativeEnd = sentimentRange.Negative.length;
    const postitiveStart = sentimentRange.Negative.length + sentimentRange.Neutral.length + 1;

    // let negativeCount = sentimentRange.Negative.length === 1 ? 0 : sentimentRange.Negative.length - 1;
    // let neutralCount = sentimentRange.Negative.length === 1 ? sentimentRange.Neutral.length + 1 : sentimentRange.Neutral.length;
    // let positiveCount = sentimentRange.Positive.length < 2 ? 0 : sentimentRange.Positive.length - 1;

    // if(neutralCount === 1) {
    //     positiveCount--;
    //     neutralCount++;
    // }

    const {design} = designStore;
    const colors = [design.negativeColor, design.neutralColor, design.positiveColor];

    // const values = [negativeCount, neutralCount, positiveCount];

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
                        negativeEnd={negativeEnd}
                        positiveStart={postitiveStart}
                        onChange={handleRangeChange}
                    />
                </div>
            </div>
        </div>
    )
};

export default inject('otherStore', 'designStore')(observer(OtherPanel));