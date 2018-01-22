import {containsVariable} from './parser';

export function validColor(color) {
    //#fff or #ffffff or #ffffff00
    return [4, 7, 9].indexOf(color.length) !== -1 && !!color.match(/^#[0-9a-f]+$/i);
}

export function isValidTextConfig(content) {
    return containsVariable(content, 'TAQuestions') || containsVariable(content, 'Design');
}

export const QUESTION_PROPERTIES = {
    'TAFolderId': {
        type: String,
        isRequired: true,
        placeholder: "",
        helpLine: 'How to name text Analytics folder in parameters'
    },
    'DatasourceId': {
        type: String,
        isRequired: true,
        defaultValue: 'ds0',
        placeholder: "",
        helpLine: 'Datasource Id of the survey'
    },
    'DatabaseSchemaId': {
        type: Number,
        isRequired: true,
        pattern: /^\d*$|^$/,
        patternExplanation: 'only digits',
        placeholder: "",
        helpLine: 'Schema containing TA model'
    },
    'DatabaseTableName': {
        type: String,
        isRequired: true,
        placeholder: "",
        helpLine: 'Table containing TA model'
    },
    'RelationshipColumnName': {
        type: String,
        isRequired: false,
        defaultValue: 'parent',
        placeholder: "",
        helpLine: 'Column which contains id of parent category in table (usually "parent")'
    },
    'TextSeparator': {
        type: String,
        isRequired: false,
        defaultValue: '|',
        placeholder: "",
        helpLine: 'Separator between ParentCategory, subcategory and attribute in category name (usually "|")'
    },
    'TAQuestionName': {
        type: String,
        isRequired: true,
        pattern: /^[A-Za-z]\w*$|^$/,
        patternExplanation: 'first symbol is letter, rest are letters or digits',
        placeholder: "",
        helpLine: 'The question ID of the Text Analytics verbatim question'
    },
    'TAModelNo': {
        type: String,
        isRequired: true,
        pattern: /^\d*$|^$/,
        patternExplanation: 'only digits',
        placeholder: "",
        helpLine: 'The Genius Model ID'
    },
    'TimeVariableId': {
        type: String,
        isRequired: true,
        defaultValue: 'interview_start',
        pattern: /^[A-Za-z]\w*$|^$/,
        patternExplanation: 'first symbol is letter, rest are letters or digits',
        placeholder: "",
        helpLine: 'Date variable'  
    },
    'VariablesToViewBy': {
        type: Array,
        isRequired: false,
        pattern: /^[A-Za-z]\w*$|^$/,
        patternExplanation: 'first symbol is letter, rest are letters or digits',
        placeholder: "Add variable",
        helpLine: 'Variable to use for breaking detailed analysis table'
    },
    'HitlistColumns': {
        type: Array,
        isRequired: false,
        pattern: /^[A-Za-z]\w*$|^$/,
        patternExplanation: 'first symbol is letter, rest are letters or digits',
        placeholder: "Add column",
        helpLine: 'Additional columns in the hitlists'
    }, 
    'FilterQuestions': {
        type: Array,
        isRequired: false,
        pattern: /^[A-Za-z]\w*$|^$/,
        patternExplanation: 'first symbol is letter, rest are letters or digits',
        placeholder: "Add variable id",
        helpLine: 'Array of variable Ids for the filter page'
    },
    'CorrelationVariableId': {
        type: Array,
        isRequired: false,
        pattern: /^[A-Za-z]\w*$|^$/,
        patternExplanation: 'first symbol is letter, rest are letters or digits',
        placeholder: "Add variable id",
        helpLine: 'VariableId to make Impact analysis from'
    },
    'CorrelationSuppressingBase': {
        type: Number,
        isRequired: false,
        defaultValue: 100,
        pattern: /^\d*$|^$/,
        patternExplanation: 'only digits',
        placeholder: "",
        helpLine: 'If # of respondent for specific category is less than this number, the category will be hidden'
    }
};