import {observable, action, computed} from 'mobx';
import {SENTIMENT_NEGATIVE_END, SENTIMENT_POSITIVE_START} from '../constants';

class OtherStore {

    @observable showOnlySelectedCategoryTagInHitlist;
    @observable sentimentRange;

    constructor() {
        this.showOnlySelectedCategoryTagInHitlist = true;
        this.sentimentRange = {
            Positive: [7, 8, 9, 10, 11],
            Neutral: [6],
            Negative: [1, 2, 3, 4, 5]
        }
    }

    @computed
    get defaultValue() { //TODO: add error
        const {Negative, Positive} = this.sentimentRange;

        const negativeEnd = Negative[Negative.length - 1];
        const positiveStart = Positive[0];

        if (negativeEnd === undefined || positiveStart === undefined || positiveStart < negativeEnd) {
            return [SENTIMENT_NEGATIVE_END, SENTIMENT_POSITIVE_START];
        } else {
            return [negativeEnd, positiveStart];
        }
    };

    @action setShowOnlySelectedCategoryTagInHitlist = (showOnlySelectedCategoryTagInHitlist) => {
        this.showOnlySelectedCategoryTagInHitlist = showOnlySelectedCategoryTagInHitlist;
    };

    @action setSentimentRange = (sentimentRange) => {
        this.sentimentRange = sentimentRange;
    };
}

const otherStore = new OtherStore();

export default otherStore;
export {OtherStore};