import { SAVE_USERINFO, } from '../Actions'

const initialState = {
    userinfo: {}
}

export const saveUserInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_USERINFO:
            return {
                ...initialState,
                userinfo: action.payload
            }
        default: 
            return state;
    }
}