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

        const negativeRange = Math.max(0, values[0]);
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

        otherStore.setSentimentRange(sentiment);
    };

    const {
        showOnlySelectedCategoryTagInHitlist: showTags,
        sentimentRange
    } = otherStore;

    const {Negative, Neutral, Positive} = sentimentRange;

    let first = Negative.length;
    let third = Positive.length;

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
 
    return (
        <div>
            <PanelHeader name="Other"/>
            <div className="menu__panel_content">
                <div className="other-panel_block panel-checkable-item">
                    <span>
                        Show Only Selected Category Tag In Hitlist
                    </span>
                    <Toggle
                        style={{float: 'right'}}
                        defaultChecked={showTags}
                        onChange={handleToggleChange}/>
                </div>
                <span className="menu__panel_design-subtitle">Sentiment Range</span>
                <div className="other-panel_block">
                    <MultiSlider
                        colors={colors}
                        values={values}
                        onChange={handleRangeChange}
                    />
                </div>
                <div className="other-panel_block">
                    <span className="other-panel__sentiment_item">Positive:
                        {
                            Positive.length === 1
                                ? ' 5'
                                : ` ${5 - Positive.length + 1} to 5`
                        }
                    </span>
                    <span className="other-panel__sentiment_item">Neutral:
                        {
                            Neutral.length === 1
                                ? ` ${Neutral[0] - 6}`
                                : ` ${Neutral[0] - 6} to ${Neutral[Neutral.length - 1] - 6}`
                        }
                    </span>
                    <span className="other-panel__sentiment_item">Negative:
                        {
                            Negative.length === 1
                                ? ' -5'
                                : ` -5 to ${-5 + Negative.length - 1}`
                        }
                    </span>
                </div>
            </div>
        </div>
    )
};

export default inject('otherStore', 'designStore')(observer(OtherPanel));