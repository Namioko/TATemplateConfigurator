import {observable, action} from 'mobx';

class ComponentStore {

    @observable currentQuestionIndex = -1; //TODO: add computed name + model as ID

    @action changeCurrentQuestion = ({chosenQuestionIndex}) => {
        chosenQuestionIndex = chosenQuestionIndex === -1 ? 0 : chosenQuestionIndex;

        if (chosenQuestionIndex >= 0) {
            this.currentQuestionIndex = chosenQuestionIndex;
        }
    };
}

const componentStore = new ComponentStore();

export default componentStore;
export {ComponentStore};