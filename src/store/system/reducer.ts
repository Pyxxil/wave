import { SystemState, SystemActionType, SET_LARGE_VIEW, SET_SIDE_MENU, RESET } from './types';

const initialState: SystemState = {
    largeView: false,
    sideMenu: false,
};

const SystemReducer = (state = initialState, action: SystemActionType): SystemState => {
    switch (action.type) {
        case SET_LARGE_VIEW:
            return { ...state, largeView: action.set };

        case SET_SIDE_MENU:
            return { ...state, sideMenu: action.set };

        case RESET:
            return { ...initialState };

        default:
            return state;
    }
};

export default SystemReducer;
