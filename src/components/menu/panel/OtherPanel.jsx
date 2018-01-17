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
        const sentiment = {
            Negative: [],
            Neutral: [],
            Positive: []
        };

        const negativeRange = Math.max(0, values[0]);
        const positiveRange = Math.max(1, values[2] + 1);
        const neutralRange = SENTIMENT_MAX_VALUE - (negativeRange + positiveRange) - 1;

        let current = SENTIMENT_MIN_VALUE;

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
    const {design} = designStore;

    const {Negative, Neutral, Positive} = sentimentRange;

    const first = Negative.length === 1 ? 0 : Negative.length - 1;
    const third = Positive.length=== 1 ? 0 : Positive.length - 1;
    const second = SENTIMENT_MAX_VALUE - (third + first) - 1;
    
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