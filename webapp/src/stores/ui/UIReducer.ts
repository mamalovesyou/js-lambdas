import { OPEN_MENU_DRAWER, CLOSE_MENU_DRAWER } from './UIActionTypes'
import { UIActionType } from './UIActions'

export type UIStateType = {
    drawerOpen: boolean;
}

const initialUIState: UIStateType = {
    drawerOpen: false
}

const UIReducer = (state: UIStateType = initialUIState, action: UIActionType) => {
    switch (action.type) {
        case OPEN_MENU_DRAWER:
            return { ...state, drawerOpen: true }
        case CLOSE_MENU_DRAWER:
            return { ...state, drawerOpen: false }
        default:
            return state
    }
}

export default UIReducer;