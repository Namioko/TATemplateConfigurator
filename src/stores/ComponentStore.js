import {observable, action} from 'mobx';
import {QUESTION_WINDOW} from '../constants';

class ComponentStore {

    @observable currentQuestionIndex = -1; //TODO: add computed name + model as ID
    @observable targetWindow = QUESTION_WINDOW; //

    @action changeCurrentQuestion = ({chosenQuestionIndex}) => {
        chosenQuestionIndex = chosenQuestionIndex === -1 ? 0 : chosenQuestionIndex;

        if (chosenQuestionIndex >= 0) {
            this.currentQuestionIndex = chosenQuestionIndex;
        }
    };

    @action setTargetWindow = (value) => {
        this.targetWindow = value;
    };
}

const componentStore = new ComponentStore();

export default componentStore;
export {ComponentStore};