import {observable, action} from 'mobx';
import {QUESTION_WINDOW} from '../constants';

class ComponentStore {

    @observable currentQuestionIndex = -1;
    @observable targetWindow = QUESTION_WINDOW;
    @observable currentTab = "tab-questions";

    @action changeCurrentQuestion = ({chosenQuestionIndex}) => {
        chosenQuestionIndex = chosenQuestionIndex === -1 ? 0 : chosenQuestionIndex;

        if (chosenQuestionIndex >= 0) {
            this.currentQuestionIndex = chosenQuestionIndex;
        }
    };

    @action resetCurrentQuestion = () => {
        this.currentQuestionIndex = -1;
    };

    @action setTargetWindow = (value) => {
        this.targetWindow = value;
    };

    @action setCurrentTab  = (tabName) => {
        this.currentTab = tabName;
    };
}

const componentStore = new ComponentStore();

export default componentStore;
export {ComponentStore};