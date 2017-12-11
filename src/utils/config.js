export function buildConfig({questions, design, otherParams}) {

    const header = `public class Config {`;
    const footer = `
    ${buildDesign(design)}

    /* Please do not change anything below this point*/
        
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

    return header + footer;
}

function buildDesign(design) {
    if(design == null) {
        return `static var Design = null; //for default color scheme`;
    }

    return `
    static var Design = {
        positiveColor: "${design['positiveColor']}",       //positive color
        neutralColor: "${design['neutralColor']}",        //neutral color
        negativeColor: "${design['negativeColor']}",       //negatine color
        backgroundColor: "${design['backgroundColor']}",     //Background, inactive navigation tabs
        headerBackgroundColor: "${design['headerBackgroundColor']}",  //background for navigation panel, pagetitle and logo
        headerTextColor: "${design['headerTextColor']}",        //text color for pagetitle
        lightPrimaryColor: "${design['lightPrimaryColor']}",   //active navigation tabs, tiles background, table headers background, filter-page button
        buttonTextColor: "${design['buttonTextColor']}",     //text color for buttons
        buttonHoverColor: "${design['buttonHoverColor']}",    //color of hovered button
        buttonMainColor: "${design['buttonMainColor']}",     //buttons and links color
        tableColumnColor: "${design['tableColumnColor']}",    //Color of even columns in the table, background for reportal filters and tabs in hitlist
        primaryTextColor: "${design['primaryTextColor']}",    //Text color
        secondaryTextColor: "${design['secondaryTextColor']}",  //labels color
        dividerColor: "${design['dividerColor']}",           //color for inputs borders
        lightDividerColor: "${design['lightDividerColor']}",   //separation line between table rows
        disabledTextColor: "${design['disabledTextColor']}",      //disabled text color
        chartPalette: ["#fd9900", "#cdd1d9", "#7cc700"],    //correlation chart points colors
        areasPalette: {                                     //colors for correlation chart areas
            "Priority Issues": "#ee627d",
            "Strength": "#7cc700",
            "Monitor and Improve": "#ffb944",
            "Maintain": "#82b8ec"
        }
    }`;
}