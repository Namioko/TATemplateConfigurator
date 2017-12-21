import {observable, action, computed} from 'mobx';

class OtherStore {

    @observable showOnlySelectedCategoryTagInHitlist;
    @observable sentimentRange;

    defaultRangeMin = 1;
    defaultRangeMax = 11;
    defaultNegativeEnd = 5;
    defaultPositiveStart = 7;

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
            return [this.defaultNegativeEnd, this.defaultPositiveStart];
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