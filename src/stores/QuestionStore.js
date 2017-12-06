import {observable, action} from 'mobx';

class QuestionStore {

    @observable questions = [];

    @action addQuestion = ({
                               index,
                               TAFolderId, DatasourceId, DatabaseSchemaId, DatabaseTableName, RelationshipColumnName = "parent",
                               TextSeparator = "|", TAQuestionName, TAModelNo, TimeVariableId, VariablesToViewBy, HitlistColumns,
                               FilterQuestions, CorrelationVariableId, CorrelationSuppressingBase,
                               CorrelationVariableShownName = 'Overall Sentiment'
                           }) => {
        const newQuestion = {
            TAFolderId,                     //How to name text Analytics folder in parameters
            DatasourceId,                   //Datasource Id of the survey
            DatabaseSchemaId,               //Schema containig TA model
            DatabaseTableName,              //Table containing TA model
            RelationshipColumnName,         //Column which contains id of parent category in table (usually "parent")
            TextSeparator,                  //Separator between ParentCategory, subcategory and attribute in category name (usually "|")
            TAQuestionName,                 //the question ID of the Text Analytics
            // verbatim quesiton   (unique with model)
            TAModelNo,                      //the Genius Model ID   (unique with name)
            TimeVariableId,                 //date variable
            VariablesToViewBy,              //variable to use for breaking detailed analysis table
            HitlistColumns,                 //adiitional columns in the hitlists
            FilterQuestions,                //array of variable Ids for the filter page
            CorrelationVariableId,          //variableId to make Impact analysis from
            CorrelationSuppressingBase,     // if # of respondent for specific category is less than this number, the category will be hidden
            CorrelationVariableShownName
        };

        this.questions.splice(index, 0, newQuestion);
    };
}

const questionStore = new QuestionStore();

export default questionStore;
export {QuestionStore};