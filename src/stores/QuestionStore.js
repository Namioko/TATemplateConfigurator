import {observable, action, computed} from 'mobx';
import {QUESTION_PROPERTIES} from '../utils/validation';
import {INVALID_ID_ERROR_MESSAGE, REQUIRED_ERROR_MESSAGE} from "../constants/index";

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

        for (let key in QUESTION_PROPERTIES) {
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
        let tempQuestion = Object.assign({}, newQuestion);

        for (let key in QUESTION_PROPERTIES) {
            const property = QUESTION_PROPERTIES[key];
            const {isRequired, defaultValue, pattern, patternExplanation, type} = property;

            if (type.name === 'Number') {
                tempQuestion[key] = `${tempQuestion[key]}`;
            }

            if (isRequired && defaultValue === undefined
                && (tempQuestion[key] === undefined || tempQuestion[key] === [] || tempQuestion[key] === '')) {
                newQuestionErrors.set(key, REQUIRED_ERROR_MESSAGE);
            }

            if (type.name !== 'Array') {
                if (pattern !== undefined && !pattern.test(tempQuestion[key])) {
                    newQuestionErrors.set(key, `* invalid value (${patternExplanation})`);
                }

                if(key === 'TAQuestionName' || key === 'TAModelNo') {
                    //index is '-1' because the question is not added yet
                    if (!this.isIdUnique({
                            questionIndex: -1,
                            TAQuestionName: tempQuestion['TAQuestionName'],
                            TAModelNo: tempQuestion['TAModelNo']
                    })) {
                        newQuestionErrors.set(key, INVALID_ID_ERROR_MESSAGE);
                    }
                }
            } else {
                tempQuestion[key].forEach(item => {
                    if (pattern !== undefined && !pattern.test(item)) {
                        newQuestionErrors.set(key, `* invalid value (${patternExplanation})`);
                    }
                });
            }
        }

        this.questions.push(tempQuestion);
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