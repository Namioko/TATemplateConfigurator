import {observable, action, computed} from 'mobx';

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