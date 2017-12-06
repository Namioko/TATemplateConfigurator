import {observable, action} from 'mobx';

class OtherStore {

    @observable showOnlySelectedCategoryTagInHitlist = true;
    @observable sentimentRange;

    @action setShowOnlySelectedCategoryTagInHitlist = ({showOnlySelectedCategoryTagInHitlist}) => {
        this.showOnlySelectedCategoryTagInHitlist = showOnlySelectedCategoryTagInHitlist;
    };
}

const otherStore = new OtherStore();

export default otherStore;
export {OtherStore};