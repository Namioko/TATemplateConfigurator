import React from 'react';
import {observer} from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from './tabs';
import QuestionPanel from './panel/QuestionPanel';
import DesignPanel from './panel/DesignPanel';
import '../../assets/css/menu.css';

const Menu = () => {
    return (
        <div className='menu'>
             <Tabs defaultTab="tab-questions" vertical>
                <TabList>
                    <Tab tabFor="tab-questions">Q</Tab>
                    <Tab tabFor="tab-design">D</Tab>
                    <Tab tabFor="tab-another">A</Tab>
                </TabList>
                <TabPanel tabId="tab-questions">
                    <QuestionPanel />
                </TabPanel>
                <TabPanel tabId="tab-design">
                    <DesignPanel />
                </TabPanel>
                <TabPanel tabId="tab-another">
                    Another Panel
                </TabPanel>
            </Tabs>
        </div>
    )
};

export default Menu;