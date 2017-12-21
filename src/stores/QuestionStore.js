import {observable, action, computed} from 'mobx';

class QuestionStore {

    @observable questions = [];
    @observable errors = [];

    requiredErrorMessage = '* required';
    invalidIdErrorMessage = '* the question with that TAQuestionName and TAModelNo already exists';

    properties = [
        {
            name: 'TAFolderId',
            isRequired: true,
            isArray: false,
            placeholder: "",
            helpLine: 'How to name text Analytics folder in parameters'
        },
        {
            name: 'DatasourceId',
            isRequired: true,
            isArray: false,
            defaultValue: 'ds0',
            placeholder: "",
            helpLine: 'Datasource Id of the survey'
        },
        {
            name: 'DatabaseSchemaId',
            isRequired: true,
            isArray: false,
            pattern: /^\d*$|^$/,
            patternExplanation: 'only digits',
            placeholder: "",
            helpLine: 'Schema containing TA model'
        },
        {
            name: 'DatabaseTableName',
            isRequired: true,
            isArray: false,
            placeholder: "",
            helpLine: 'Table containing TA model'
        },
        {
            name: 'RelationshipColumnName',
            isRequired: false,
            isArray: false,
            defaultValue: 'parent',
            placeholder: "",
            helpLine: 'Column which contains id of parent category in table (usually "parent")'
        },
        {
            name: 'TextSeparator',
            isRequired: false,
            isArray: false,
            defaultValue: '|',
            placeholder: "",
            helpLine: 'Separator between ParentCategory, subcategory and attribute in category name (usually "|")'
        },
        {
            name: 'TAQuestionName',
            isRequired: true,
            isArray: false,
            pattern: /^[A-Za-z]\w*$|^$/,
            patternExplanation: 'first symbol is letter, rest are letters or digits',
            placeholder: "",
            helpLine: 'The question ID of the Text Analytics verbatim question'
        },
        {
            name: 'TAModelNo',
            isRequired: true,
            isArray: false,
            pattern: /^\d*$|^$/,
            patternExplanation: 'only digits',
            placeholder: "",
            helpLine: 'The Genius Model ID'
        },
        {
            name: 'TimeVariableId',
            isRequired: true,
            isArray: false,
            defaultValue: 'interview_start',
            pattern: /^[A-Za-z]\w*$|^$/,
            patternExplanation: 'first symbol is letter, rest are letters or digits',
            placeholder: "",
            helpLine: 'Date variable'
        },
        {
            name: 'VariablesToViewBy',
            isRequired: false,
            isArray: true,
            pattern: /^[A-Za-z]\w*$|^$/,
            patternExplanation: 'first symbol is letter, rest are letters or digits',
            placeholder: "Add variable",
            helpLine: 'Variable to use for breaking detailed analysis table'
        },
        {
            name: 'HitlistColumns',
            isRequired: false,
            isArray: true,
            pattern: /^[A-Za-z]\w*$|^$/,
            patternExplanation: 'first symbol is letter, rest are letters or digits',
            placeholder: "Add column",
            helpLine: 'Additional columns in the hitlists'
        },
        {
            name: 'FilterQuestions',
            isRequired: false,
            isArray: true,
            pattern: /^[A-Za-z]\w*$|^$/,
            patternExplanation: 'first symbol is letter, rest are letters or digits',
            placeholder: "Add variable id",
            helpLine: 'Array of variable Ids for the filter page'
        },
        {
            name: 'CorrelationVariableId',
            isRequired: false,
            isArray: true,
            pattern: /^[A-Za-z]\w*$|^$/,
            patternExplanation: 'first symbol is letter, rest are letters or digits',
            placeholder: "Add variable id",
            helpLine: 'VariableId to make Impact analysis from'
        },
        {
            name: 'CorrelationSuppressingBase',
            isRequired: false,
            isArray: false,
            defaultValue: 100,
            pattern: /^\d*$|^$/,
            patternExplanation: 'only digits',
            placeholder: "",
            helpLine: 'If # of respondent for specific category is less than this number, the category will be hidden'
        }
    ];

    @computed
    get indexOfFirstQuestionErrors() {
        return this.errors.findIndex(item => item.size > 0);
    };

    @action
    addQuestion = ({index}) => {
        const newQuestion = {};

        const newQuestionErrors = new Map();

        this.properties.forEach((property) => {
            newQuestion[property.name] =
                property.isArray && property.defaultValue === undefined
                    ? []
                    : property.defaultValue;

            if(property.isRequired && property.defaultValue === undefined) {
                newQuestionErrors.set(property.name, this.requiredErrorMessage);
            }
        });

        this.questions.splice(index, 0, newQuestion);
        this.errors.splice(index, 0, newQuestionErrors);
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

    @action
    isIdUnique = ({questionIndex, TAQuestionName, TAModelNo}) => {
        return !this.questions.some((item, index) =>
            item.TAQuestionName === TAQuestionName && item.TAModelNo === TAModelNo && questionIndex !== index);
    };
}

const questionStore = new QuestionStore();

export default questionStore;
export {QuestionStore};