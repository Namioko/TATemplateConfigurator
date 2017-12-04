import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from './tabs';
import QuestionPanel from './panel/QuestionPanel';
import DesignPanel from './panel/DesignPanel';
import OtherPanel from './panel/OtherPanel';
import '../../assets/css/menu.css';
import SmsIcon from  '../../assets/img/icons/ic_sms.svg';
import DesignIcon from '../../assets/img/icons/ic_color.svg';
import MoreIcon from '../../assets/img/icons/ic_more.svg';

const Menu = () => {
    return (
        <div className='menu'>
             <Tabs defaultTab="tab-questions" vertical>
                <TabList>
                    <Tab tabFor="tab-questions"><img src={SmsIcon} className="tab-icon" alt="Questions"/></Tab>
                    <Tab tabFor="tab-design"><img src={DesignIcon} className="tab-icon" alt="Design"/></Tab>
                    <Tab tabFor="tab-another"><img src={MoreIcon} className="tab-icon" alt="Another"/></Tab>
                </TabList>
                <TabPanel tabId="tab-questions">
                    <QuestionPanel />
                </TabPanel>
                <TabPanel tabId="tab-design">
                    <DesignPanel />
                </TabPanel>
                <TabPanel tabId="tab-another">
                    <OtherPanel />
                </TabPanel>
            </Tabs>
        </div>
    )
};

export default Menu;