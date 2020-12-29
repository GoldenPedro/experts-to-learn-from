export const SAVE_USERINFO = 'SAVE_USERINFO';

export const saveUserInfoAction = (userinfo) => {
    return dispatch => {
        dispatch({ type: SAVE_USERINFO, payload: userinfo });
    }
}