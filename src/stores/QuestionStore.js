import {observable, action, computed} from 'mobx';
import {QUESTION_PROPERTIES} from '../utils/validation';
import {REQUIRED_ERROR_MESSAGE} from "../constants/index";

class QuestionStore {

    @observable questions = [];
    @observable errors = [];

    @computed
    get indexOfFirstQuestionErrors() {
        return this.errors.findIndex(item => item.size > 0);
    };

    @action
    addQuestion = ({index}) => {
        const newQuestion = {};

        const newQuestionErrors = new Map();

        for(let key in QUESTION_PROPERTIES) {
            const property = QUESTION_PROPERTIES[key];
            newQuestion[key] = property.type.name === 'Array' && property.defaultValue === undefined
                ? []
                : property.defaultValue;

            if (property.isRequired && property.defaultValue === undefined) {
                newQuestionErrors.set(key, REQUIRED_ERROR_MESSAGE);
            }
        }

        this.questions.splice(index, 0, newQuestion);
        this.errors.splice(index, 0, newQuestionErrors);
    };

    @action
    addQuestionToEnd = (newQuestion) => {
        const newQuestionErrors = new Map();

        for(let key in QUESTION_PROPERTIES) {
            const property = QUESTION_PROPERTIES[key];

            if (property.isRequired && property.defaultValue === undefined
                && (newQuestion[key] === undefined || newQuestion[key] === [] || newQuestion[key] === '')) {
                newQuestionErrors.set(key, REQUIRED_ERROR_MESSAGE);
            }
        }

        this.questions.push(newQuestion);
        this.errors.push(newQuestionErrors);
    };

    @action
    clearQuestions = () => {
        this.questions.length = 0;
        this.errors.length = 0;
    };

    @action
    deleteQuestion = ({index}) => {
        this.questions.splice(index, 1);
        this.errors.splice(index, 1);
    };

    @action
    setQuestionProperty = ({index, propertyName, propertyValue}) => {
        this.questions[index][propertyName] = propertyValue;
    };

    @observable
    isIdUnique = ({questionIndex, TAQuestionName, TAModelNo}) => {
        return !this.questions.some((item, index) =>
            item.TAQuestionName === TAQuestionName && item.TAModelNo === TAModelNo && questionIndex !== index);
    };

    @observable
    getQuestionId = ({index}) => {
        const tempQuestion = this.questions[index];
        let name = tempQuestion.TAQuestionName
            ? tempQuestion.TAQuestionName
            : `q${index}`;
        return name + (tempQuestion.TAModelNo ? `-${tempQuestion.TAModelNo}` : '');
    }
}

const questionStore = new QuestionStore();

export default questionStore;
export {QuestionStore};