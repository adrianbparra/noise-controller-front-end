import React from 'react';
import {  Tab,  } from 'semantic-ui-react';

import AccountSettings from "./AccountSettings.js";
import GameSettings from './GameSettings.js';

const panes = [
    { menuItem: 'Account Settings', render: () => <AccountSettings/> },
    { menuItem: 'Game Settings', render: () => <GameSettings/> },
  ]

const Settings = () => {

    return (
        <Tab panes={panes}/>
    );
}


export default Settings;