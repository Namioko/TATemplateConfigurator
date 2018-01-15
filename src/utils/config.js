export function buildConfig({questions, design, otherParams}) {
    return `public class Config {

    ${buildQuestions(questions)}

    static var CustomerLogo = "${otherParams.customerLogo || ''}"; // link to the company logo
    
    static var ShowOnlySelectedCategoryTagInHitlist = ${!!otherParams.showOnlySelectedCategoryTagInHitlist}; //set to false if you want to see all categories captured for comment in the hitlist everytime
    ${buildDesign(design)}
    
    /* Negative-neutral-positive breaking on 1-11 scale) */
    ${buildSentiment(otherParams.sentimentRange)}

    /* Please do not change anything below this point */
        
    static var Colors = {
        NegNeuPosPalette: {
            Negative: Design ? Design.negativeColor : "#fd9900",
            Neutral: Design ? Design.neutralColor : "#cdd1d9",
            Positive: Design ? Design.positiveColor : "#7cc700"
        },
        
        ChartPalette: Design ? Design.chartPalette : ["rgba(244,67,54,0.5)",
                                                    "#9C27B0",
                                                    "#3F51B5",
                                                    "#03A9F4",
                                                    "#009688",
                                                    "#8BC34A",
                                                    "#FFEB3B",
                                                    "#FF5722",
                                                    "#9E9E9E",
                                                    "#607D8B"],
        AreasPalette: Design ? Design.areasPalette : {
            "Priority Issues": "#ee627d",
            "Strength": "#7cc700",
            "Monitor and Improve": "#ffb944",
            "Maintain": "#82b8ec"
        }
    };
    
    private static var _TALibrary: TALibrary;
    private static var _haveTALibrary;
        
    static function SetTALibrary(globals) {
        if(!_haveTALibrary){
            _TALibrary = new TALibrary(globals, Config);
            _haveTALibrary = true;
        }
    }
        
    static function GetTALibrary() {
        return _TALibrary;
    }
}`;
}

function buildQuestions(questions) {
    if (questions == null || questions.length === 0) {
        return `static var TAQuestions = [];`
    }

    let content = '';

    for (let i = 0; i < questions.length; i++) {
        content += `
        {
            TAFolderId: "${questions[i]['TAFolderId'] || ''}", //How to name text Analytics folder in parameters
            
            DatasourceId: "${questions[i]['DatasourceId'] || ''}",  //Datasource Id of the survey
            
            DatabaseSchemaId: ${questions[i]['DatabaseSchemaId'] || 0}, //Schema containig TA model
            DatabaseTableName: "${questions[i]['DatabaseTableName'] || ''}", //Table containing TA model                   
            RelationshipColumnName: "${questions[i]['RelationshipColumnName'] || ''}", //Column which contains id of parent category in table (usually "parent")
            TextSeparator: "${questions[i]['TextSeparator'] || ''}", //Separator between ParentCategory, subcategory and attribute in category name (usually "|")
                       
            TAQuestionName: "${questions[i]['TAQuestionName'] || ''}", // the question ID of the Text Analytics verbatim quesiton
            TAModelNo: "${questions[i]['TAModelNo'] || ''}", // the Genius Model ID
            
            TimeVariableId: '${questions[i]['TimeVariableId'] || ''}', //date variable
            VariablesToViewBy: ${JSON.stringify(questions[i]['VariablesToViewBy'])}, //variable to use for breaking detailed analysis table
            HitlistColumns: ${JSON.stringify(questions[i]['HitlistColumns'])},//adiitional columns in the hitlists
            FilterQuestions: ${JSON.stringify(questions[i]['FilterQuestions'])}, //array of variable Ids for the filter page
            CorrelationVariableId: ${JSON.stringify(questions[i]['CorrelationVariableId'])}, //variableId to make Impact analysis from
            CorrelationSuppressingBase: ${questions[i]['CorrelationSuppressingBase'] || 0} // if # of respondent for specific category is less than this number, the category will be hidden
        }${(i < questions.length - 1) ? ',' : ''}`;
    }

    return `static var TAQuestions = [${content}];`
}

function buildDesign(design) {
    if (design == null) {
        return `static var Design = null; //for default color scheme`;
    }

    return `
    static var Design = {
        positiveColor: "${design['positiveColor']}", //positive color
        neutralColor: "${design['neutralColor']}", //neutral color
        negativeColor: "${design['negativeColor']}", //negatine color
        backgroundColor: "${design['backgroundColor']}", //Background, inactive navigation tabs
        headerBackgroundColor: "${design['headerBackgroundColor']}", //background for navigation panel, pagetitle and logo
        headerTextColor: "${design['headerTextColor']}", //text color for pagetitle
        lightPrimaryColor: "${design['lightPrimaryColor']}", //active navigation tabs, tiles background, table headers background, filter-page button
        buttonTextColor: "${design['buttonTextColor']}", //text color for buttons
        buttonHoverColor: "${design['buttonHoverColor']}", //color of hovered button
        buttonMainColor: "${design['buttonMainColor']}", //buttons and links color
        tableColumnColor: "${design['tableColumnColor']}", //Color of even columns in the table, background for reportal filters and tabs in hitlist
        primaryTextColor: "${design['primaryTextColor']}", //Text color
        secondaryTextColor: "${design['secondaryTextColor']}", //labels color
        dividerColor: "${design['dividerColor']}", //color for inputs borders
        lightDividerColor: "${design['lightDividerColor']}", //separation line between table rows
        disabledTextColor: "${design['disabledTextColor']}", //disabled text color
        chartPalette: ${JSON.stringify(design['chartPalette'])}, //correlation chart points colors
        areasPalette: { //colors for correlation chart areas
            "Priority Issues": "${design['areasPalette']['Priority Issues']}",
            "Strength": "${design['areasPalette']['Strength']}",
            "Monitor and Improve": "${design['areasPalette']['Monitor and Improve']}",
            "Maintain": "${design['areasPalette']['Maintain']}"
        }
    }`;
}

function buildSentiment(sentimentRange) {
    return `    
    static const SentimentRange = {
        Positive: ${JSON.stringify(sentimentRange.Positive)},
        Neutral: ${JSON.stringify(sentimentRange.Neutral)},
        Negative: ${JSON.stringify(sentimentRange.Negative)}
    }`;
}