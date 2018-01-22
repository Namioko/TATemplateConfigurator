import {extractVariable} from './parser';
import {validColor, QUESTION_PROPERTIES} from './validation';
import {DEFAULT_COLORS, DEFAULT_AREAS_PALETTE, DEFAULT_CHART_PALETTE} from '../constants/design';
import {SENTIMENT_MAX_VALUE, SENTIMENT_MIN_VALUE} from '../constants';

export function parseTextConfig(content) {
    let result = {
        ShowOnlySelectedCategoryTagInHitlist: false,
        CustomerLogo: "",
        Design: Object.assign({}, DEFAULT_COLORS, {
            chartPalette: DEFAULT_CHART_PALETTE.slice(),
            areasPalette: Object.assign({}, DEFAULT_AREAS_PALETTE)
        }),
        Questions: [],
        SentimentRange:  {
            Negative: [],
            Neutral: [],
            Positive: []
        }
    };

    result.ShowOnlySelectedCategoryTagInHitlist = !!extractVariable(content, "ShowOnlySelectedCategoryTagInHitlist");
    result.CustomerLogo = extractVariable(content, "CustomerLogo").toString();

    const configDesign = extractVariable(content, "Design");

    if(configDesign) { 
        for (let key in DEFAULT_COLORS) {
            const color = configDesign[key];

            result.Design[key] = (color != null && validColor(color)) ? color : DEFAULT_COLORS[key];
        }

        for(let key in DEFAULT_AREAS_PALETTE) {
            const color = configDesign['areasPalette'][key];

            result.Design['areasPalette'][key] = (color != null && validColor(color)) ? color : DEFAULT_AREAS_PALETTE[key];
        }

        const chartPalette = configDesign['chartPalette'];
        if(chartPalette == null || !(chartPalette instanceof Array)) {
            result.Design['chartPalette'] = [];
        } else {
            let validChartColors = [];

            for(let i = 0; i < chartPalette.length; i++) {
                if(validColor(chartPalette[i])) {
                    validChartColors.push(chartPalette[i]);
                }
            }

            result.Design['chartPalette'] = validChartColors;
        }
    }

    const questions = extractVariable(content, "TAQuestions");

    for(let i = 0; i < questions.length; i++) {
        const currentQuestion = questions[i];
        let newQuestion = {};

        for (let key in QUESTION_PROPERTIES) {
            let propertyType = QUESTION_PROPERTIES[key].type;

            if(propertyType === Number && !(typeof currentQuestion[key] === "number")) {
                newQuestion[key] = (QUESTION_PROPERTIES[key].defaultValue != null) ? QUESTION_PROPERTIES[key].defaultValue : 0;
            } else if(propertyType === String && !(typeof currentQuestion[key]  === "string")) {
                newQuestion[key] = (QUESTION_PROPERTIES[key].defaultValue != null) ? QUESTION_PROPERTIES[key].defaultValue : "";
            } else if(propertyType === Array && !(currentQuestion[key] instanceof Array)) {
                newQuestion[key] = (QUESTION_PROPERTIES[key].defaultValue != null) ? QUESTION_PROPERTIES[key].defaultValue : [];
            } else {
                newQuestion[key] = currentQuestion[key];
            }
        }

        result.Questions.push(newQuestion);
    }

    const sentimentRange = extractVariable(content, "SentimentRange");

    let current = SENTIMENT_MIN_VALUE;
    for(let i = 0; i < sentimentRange.Negative.length; i++) {
        result.SentimentRange.Negative.push(current);
        current++;
    }

    for(let i = 0; i < sentimentRange.Neutral.length; i++) {
        result.SentimentRange.Neutral.push(current);
        current++;
    }

    const count = SENTIMENT_MAX_VALUE - current + 1;
    for(let i = 0; i < count; i++) {
        result.SentimentRange.Positive.push(current);
        current++;
    }

    return result;
}