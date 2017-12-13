import {observable, action} from 'mobx';

class QuestionStore {

    @observable questions = [];

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
            placeholder: "",
            helpLine: 'The question ID of the Text Analytics verbatim question'
        },
        {
            name: 'TAModelNo',
            isRequired: true,
            isArray: false,
            pattern: /^\d*$|^$/,
            placeholder: "",
            helpLine: 'The Genius Model ID'
        },
        {
            name: 'TimeVariableId',
            isRequired: true,
            isArray: false,
            defaultValue: 'interview_start',
            pattern: /^[A-Za-z]\w*$|^$/,
            placeholder: "",
            helpLine: 'Date variable'
        },
        {
            name: 'VariablesToViewBy',
            isRequired: false,
            isArray: true,
            pattern: /^[A-Za-z]\w*$|^$/,
            placeholder: "Add variable",
            helpLine: 'Variable to use for breaking detailed analysis table'
        },
        {
            name: 'HitlistColumns',
            isRequired: false,
            isArray: true,
            pattern: /^[A-Za-z]\w*$|^$/,
            placeholder: "Add column",
            helpLine: 'Additional columns in the hitlists'
        },
        {
            name: 'FilterQuestions',
            isRequired: false,
            isArray: true,
            pattern: /^[A-Za-z]\w*$|^$/,
            placeholder: "Add variable id",
            helpLine: 'Array of variable Ids for the filter page'
        },
        {
            name: 'CorrelationVariableId',
            isRequired: false,
            isArray: true,
            pattern: /^[A-Za-z]\w*$|^$/,
            placeholder: "Add variable id",
            helpLine: 'VariableId to make Impact analysis from'
        },
        {
            name: 'CorrelationSuppressingBase',
            isRequired: false,
            isArray: false,
            defaultValue: 100,
            pattern: /^\d*$|^$/,
            placeholder: "",
            helpLine: 'If # of respondent for specific category is less than this number, the category will be hidden'
        },
        //CorrelationVariableShownName = 'Overall Sentiment'
    ];

    @action
    addQuestion = ({index}) => {
        const newQuestion = {
            CorrelationVariableShownName: 'Overall Sentiment'
        };

        this.properties.forEach((property) => {
            newQuestion[property.name] =
                property.isArray && property.defaultValue === undefined
                    ? []
                    : property.defaultValue;
        });

        this.questions.splice(index, 0, newQuestion);
    };

    @action
    deleteQuestion = ({index}) => {
        this.questions.splice(index, 1);
    };

    @action
    setQuestionProperty = ({index, propertyName, propertyValue}) => {
        this.questions[index][propertyName] = propertyValue;
    };
}

const questionStore = new QuestionStore();

export default questionStore;
export {QuestionStore};