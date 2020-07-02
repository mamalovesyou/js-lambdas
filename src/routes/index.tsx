import React from 'react';

import EditorModePage from '../containers/EditorModePage';
import WorkerModePage from '../containers/WorkerModePage';
import MenuItem from '../components/MenuItem';
import FitnessIcon from '@material-ui/icons/FitnessCenter';
import CodeIcon from '@material-ui/icons/Code';

type Route  = {
    path: string,
    component: any,
    menuComponent: (key: string | number, to: string) => any
}

export const appRoutes: Route[] = [
    {
        path: "/",
        component: EditorModePage,
        menuComponent: (key, to) => {} // Not in the menu
    },
    {
        path: "/editor",
        component: EditorModePage,
        menuComponent: (key, to) => <MenuItem key={key} to={to} text="Editor Mode"><CodeIcon/></MenuItem>
    },
    {
        path: "/worker",
        component: WorkerModePage,
        menuComponent: (key, to) => <MenuItem key={key} to={to} text="Worker Mode"><FitnessIcon/></MenuItem>
    }
]