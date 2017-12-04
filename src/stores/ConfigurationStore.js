import {observable, action } from "mobx"

class ConfigurationStore {
    @observable questions = [];
    @observable customerLogo = '';
    @observable showOnlySelectedCategoryTagInHitlist = true;
    @observable design = null;
    @observable sentimentRange;
    @observable chosenQuestionIndex = -1;

    @action addQuestion = ({
                               index,
                               TAFolderId, DatasourceId, DatabaseSchemaId, DatabaseTableName, RelationshipColumnName = "parent",
                               TextSeparator = "|", TAQuestionName = "no title", TAModelNo, TimeVariableId, VariablesToViewBy, HitlistColumns,
                               FilterQuestions, CorrelationVariableId, CorrelationSuppressingBase,
                               CorrelationVariableShownName = 'Overall Sentiment'
                           }) => {
        const newQuestion = {
            TAFolderId, //How to name text Analytics folder in parameters
            DatasourceId,  //Datasource Id of the survey
            DatabaseSchemaId, //Schema containig TA model
            DatabaseTableName, //Table containing TA model
            RelationshipColumnName, //Column which contains id of parent category in table (usually "parent")
            TextSeparator, //Separator between ParentCategory, subcategory and attribute in category name (usually "|")
            TAQuestionName, // the question ID of the Text Analytics verbatim quesiton
            TAModelNo,             // the Genius Model ID
            TimeVariableId, //date variable
            VariablesToViewBy, //variable to use for breaking detailed analysis table
            HitlistColumns,//adiitional columns in the hitlists
            FilterQuestions, //array of variable Ids for the filter page
            CorrelationVariableId, //variableId to make Impact analysis from
            CorrelationSuppressingBase, // if # of respondent for specific category is less than this number, the category will be hidden
            CorrelationVariableShownName
        };

        this.questions.splice(index, 0, newQuestion);
        if(index === -1) {
            index++;
        }
        this.chosenQuestionIndex = index;
    };

    @action setCustomerLogo = ({customerLogo}) => {
        this.customerLogo = customerLogo;
    };

    @action setShowOnlySelectedCategoryTagInHitlist = ({showOnlySelectedCategoryTagInHitlist}) => {
        this.showOnlySelectedCategoryTagInHitlist = showOnlySelectedCategoryTagInHitlist;
    };

    @action setDesign = () => {
    }; //TODO: make setting design by each field(?)

    @action setSentimentRange = () => {
    }; //TODO: make setting sentiment range by each field(?)

    @action changeCurrentQuestion = ({chosenQuestionIndex}) => {
        if(chosenQuestionIndex >= 0 && chosenQuestionIndex < this.questions.length) {
            this.chosenQuestionIndex = chosenQuestionIndex;
        }
    };
}

const configurationStore = new ConfigurationStore();

export default configurationStore;
export { ConfigurationStore };