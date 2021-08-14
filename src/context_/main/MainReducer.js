import { SET_USER, SET_PROJECT, SET_LOGOUT } from '../type';


export default (state, action) => {

    switch (action.type) {

        case SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            }

        case SET_LOGOUT:

            return {
                ...state,
                isAuthenticated: false,
                user: ''

            }

        default:
            return state

    }


}