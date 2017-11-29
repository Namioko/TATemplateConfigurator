import React from 'react';
import {observer} from 'mobx-react';
import QuestionSubmenu from "./questions/questions-submenu";
import { Tab, Tabs, TabList, TabPanel } from './tabs';

const Menu = () => {
    return (
        <div className='menu'>
            <QuestionSubmenu/>
            <Tabs>
                <TabList>
                    <Tab>Question</Tab>
                    <Tab>Design</Tab>
                    <Tab>Another</Tab>
                </TabList>
                <TabPanel>
                    Question Panel
                </TabPanel>
                <TabPanel>
                    Design Panel
                </TabPanel>
                <TabPanel>
                    Another Panel
                </TabPanel>
            </Tabs>
        </div>
    )
};

export default observer(Menu);