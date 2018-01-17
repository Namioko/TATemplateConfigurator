import React from 'react';
import {Tab, Tabs, TabList, TabPanel} from './tabs';
import {observer, inject} from 'mobx-react';
import QuestionPanel from './panel/QuestionPanel';
import DesignPanel from './panel/DesignPanel';
import OtherPanel from './panel/OtherPanel';
import '../../assets/css/menu.css';
import SmsIcon from '../../assets/img/icons/ic_sms.svg';
import DesignIcon from '../../assets/img/icons/ic_color.svg';
import MoreIcon from '../../assets/img/icons/ic_more.svg';
import {QUESTION_WINDOW, DESIGN_WINDOW} from '../../constants';

const Menu = ({componentStore}) => {

    const changeTab = (tabName, targetWindow) => {
        componentStore.setCurrentTab(tabName);

        if(targetWindow !== -1) {
            componentStore.setTargetWindow(targetWindow);
        }
    };

    const {currentTab} = componentStore;

    return (
        <div className='menu'>
            <Tabs defaultTab={currentTab} vertical>
                <TabList>
                    <Tab tabFor="tab-questions" onClick={() => changeTab("tab-questions", QUESTION_WINDOW)}>
                        <img src={SmsIcon} className="tab-icon" alt="Questions"/>
                        <span className="tabLabel">Questions</span>
                    </Tab>
                    <Tab tabFor="tab-design" onClick={() => changeTab("tab-design", DESIGN_WINDOW)}>
                        <img src={DesignIcon} className="tab-icon" alt="Design"/>
                        <span className="tabLabel">Design</span>
                    </Tab>
                    <Tab tabFor="tab-other" onClick={() => changeTab("tab-other", -1)}>
                        <img src={MoreIcon} className="tab-icon" alt="Other"/>
                        <span className="tabLabel">Other</span>
                    </Tab>
                </TabList>
                <TabPanel tabId="tab-questions">
                    <QuestionPanel/>
                </TabPanel>
                <TabPanel tabId="tab-design">
                    <DesignPanel/>
                </TabPanel>
                <TabPanel tabId="tab-other">
                    <OtherPanel/>
                </TabPanel>
            </Tabs>
        </div>
    )
};

export default inject('componentStore')(observer(Menu));