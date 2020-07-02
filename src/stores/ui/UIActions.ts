import {OPEN_MENU_DRAWER, CLOSE_MENU_DRAWER} from './UIActionTypes';

export const openMenuDrawer = () => ({type: OPEN_MENU_DRAWER})
export const closeMenuDrawer = () => ({type: CLOSE_MENU_DRAWER})

export type UIActionType = {
    type: string;
}