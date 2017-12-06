import {observable, action} from 'mobx';

class DesignStore {

    @observable customerLogo;
    @observable design;

    constructor() {
        this.customerLogo = "https://reportal.euro.confirmit.com/cf_clientutil/themes/flattheme/images/logo-gigantic.png";
        this.design = {
            positiveColor: "#7cc700",       //positive color
            neutralColor: "#cdd1d9",        //neutral color
            negativeColor: "#fd9900",       //negatine color
            backgroundColor: "#e1e4e9",     //Background, inactive navigation tabs
            headerBackgroundColor: "#000",  //background for navigation panel, pagetitle and logo
            headerTextColor: "#fff",        //text color for pagetitle
            lightPrimaryColor: "#f0f2f5",   //active navigation tabs, tiles background, table headers background, filter-page button
            buttonTextColor: "#FFFFFF",     //text color for buttons
            buttonHoverColor: "#0087c4",    //color of hovered button
            buttonMainColor: "#30b8f1",     //buttons and links color
            tableColumnColor: "#f6f6f6",    //Color of even columns in the table, background for reportal filters and tabs in hitlist
            primaryTextColor: "#3F454C",    //Text color
            secondaryTextColor: "#737B8E",  //labels color
            dividerColor: "#ccc",           //color for inputs borders
            lightDividerColor: "#e1e4e9",   //separation line between table rows
            disabledTextColor: "#ccc",      //disabled text color
            chartPalette: ["#fd9900", "#cdd1d9", "#7cc700"],    //correlation chart points colors
            areasPalette: {                                     //colors for correlation chart areas
                "Priority Issues": "#ee627d",
                "Strength": "#7cc700",
                "Monitor and Improve": "#ffb944",
                "Maintain": "#82b8ec"
            }
        };
    }

    @action setCustomerLogo = (customerLogo) => {
        this.customerLogo = customerLogo;
    };

    @action setProperty = (propertyName, propertyValue) => {
        this.design[propertyName] = propertyValue;
    };
}

const designStore = new DesignStore();

export default designStore;
export {DesignStore};