import { useReducer } from 'react';
import MainContext from './MainContext';
import MainReducer from './MainReducer';
import { SET_LOGOUT, SET_USER, SET_PROJECT } from '../type';


const MainState = (props) => {

    const Initial_state = {

        isAuthenticated: true,
        user: '',
        project: []

    }

    const [state, dispatch] = useReducer(MainReducer, Initial_state);


    const setUser = (user) => {
        sessionStorage.setItem('isAuthenticated', true);

        let User_Details = user;

        //console.log("User", User_Details);

        sessionStorage.setItem('User_Details', user)
        dispatch({
            type: SET_USER,
            payload: user
        });

    }

    const setLogout = () => {

        sessionStorage.clear();

        dispatch({
            type: SET_LOGOUT
        });
    }

    return <MainContext.Provider value={{

        isAuthenticated: state.isAuthenticated,
        user: state.user,
        setUser,
        setLogout

    }}>
        {props.children}
    </MainContext.Provider>


}


export default MainState;

