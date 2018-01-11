import {observable, action} from 'mobx';
import * as Constants from '../constants/design';

class DesignStore {

    @observable customerLogo;
    @observable design;

    constructor() {
        this.customerLogo = Constants.DEFAULT_CUSTOMER_LOGO;
        this.design = Object.assign({}, Constants.DEFAULT_COLORS, {
            chartPalette: Constants.DEFAULT_CHART_PALETTE.slice(),
            areasPalette: Object.assign({}, Constants.DEFAULT_AREAS_PALETTE)
        });
    }

    @action setCustomerLogo = (customerLogo) => {
        this.customerLogo = customerLogo;
    };

    @action setProperty = (propertyName, propertyValue) => {
        this.design[propertyName] = propertyValue;
    };

    @action setAreaPalette = (areaName, areaColor) => {
        this.design['areasPalette'][areaName] = areaColor;
    };
}

const designStore = new DesignStore();

export default designStore;
export {DesignStore};