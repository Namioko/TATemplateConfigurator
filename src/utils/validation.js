export function validColor(color) {
    //#fff or #ffffff
    return color.match(/^#[0-9a-f]{3}([0-9a-f]{3})?$/i);
}

export const QUESTION_PROPERTIES = {
    'TAFolderId': {
        isRequired: true,
        isArray: false,
        placeholder: "",
        helpLine: 'How to name text Analytics folder in parameters'
    },
    'DatasourceId': {
        isRequired: true,
        isArray: false,
        defaultValue: 'ds0',
        placeholder: "",
        helpLine: 'Datasource Id of the survey'
    },
    'DatabaseSchemaId': {
        isRequired: true,
        isArray: false,
        pattern: /^\d*$|^$/,
        patternExplanation: 'only digits',
        placeholder: "",
        helpLine: 'Schema containing TA model'
    },
    'DatabaseTableName': {
        isRequired: true,
        isArray: false,
        placeholder: "",
        helpLine: 'Table containing TA model'
    },
    'RelationshipColumnName': {
        isRequired: false,
        isArray: false,
        defaultValue: 'parent',
        placeholder: "",
        helpLine: 'Column which contains id of parent category in table (usually "parent")'
    },
    'TextSeparator': {
        isRequired: false,
        isArray: false,
        defaultValue: '|',
        placeholder: "",
        helpLine: 'Separator between ParentCategory, subcategory and attribute in category name (usually "|")'
    },
    'TAQuestionName': {
        isRequired: true,
        isArray: false,
        pattern: /^[A-Za-z]\w*$|^$/,
        patternExplanation: 'first symbol is letter, rest are letters or digits',
        placeholder: "",
        helpLine: 'The question ID of the Text Analytics verbatim question'
    },
    'TAModelNo': {
        isRequired: true,
        isArray: false,
        pattern: /^\d*$|^$/,
        patternExplanation: 'only digits',
        placeholder: "",
        helpLine: 'The Genius Model ID'
    },
    'TimeVariableId': {
        isRequired: true,
        isArray: false,
        defaultValue: 'interview_start',
        pattern: /^[A-Za-z]\w*$|^$/,
        patternExplanation: 'first symbol is letter, rest are letters or digits',
        placeholder: "",
        helpLine: 'Date variable'  
    },
    'VariablesToViewBy': {
        isRequired: false,
        isArray: true,
        pattern: /^[A-Za-z]\w*$|^$/,
        patternExplanation: 'first symbol is letter, rest are letters or digits',
        placeholder: "Add variable",
        helpLine: 'Variable to use for breaking detailed analysis table'
    },
    'HitlistColumns': {
        isRequired: false,
        isArray: true,
        pattern: /^[A-Za-z]\w*$|^$/,
        patternExplanation: 'first symbol is letter, rest are letters or digits',
        placeholder: "Add column",
        helpLine: 'Additional columns in the hitlists'
    }, 
    'FilterQuestions': {
        isRequired: false,
        isArray: true,
        pattern: /^[A-Za-z]\w*$|^$/,
        patternExplanation: 'first symbol is letter, rest are letters or digits',
        placeholder: "Add variable id",
        helpLine: 'Array of variable Ids for the filter page'
    },
    'CorrelationVariableId': {
        isRequired: false,
        isArray: true,
        pattern: /^[A-Za-z]\w*$|^$/,
        patternExplanation: 'first symbol is letter, rest are letters or digits',
        placeholder: "Add variable id",
        helpLine: 'VariableId to make Impact analysis from'
    },
    'CorrelationSuppressingBase': {
        isRequired: false,
        isArray: false,
        defaultValue: 100,
        pattern: /^\d*$|^$/,
        patternExplanation: 'only digits',
        placeholder: "",
        helpLine: 'If # of respondent for specific category is less than this number, the category will be hidden'
    }
};