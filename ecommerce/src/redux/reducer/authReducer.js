import {authConstants, userConstants} from '../action/constants';

const initialState = {
    token:null,
    user:{},
    authenticate:false,
    loading:false,
    message:'',
    userData:{},
    ProductName:'',
    forget:false,
    reset:false,
    error:null
}

const authReducer = (state = initialState,action) =>{
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            state ={
                ...state,
                authenticate:false,
                loading:true,
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                token:action.payload.token,
                user:action.payload.user,
                authenticate:true,
                loading:false
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                error:action.payload.error,
                authenticate:false,
                loading:false,
                isloggedIn:false
            }
            break;       
        case userConstants.SIGNUP_REQUEST:
            state ={
                ...state,
                loading:true
            }
            break;
        case userConstants.SIGNUP_SUCCESS:
            state = {
                ...state,
                userData:action.payload.userData,
                loading:false
            }
            break;
        case userConstants.SIGNUP_FAILURE:
            state = {
                ...state,
                error:action.payload.error,
                loading:false,
            }
            break;  
         case authConstants.LOGOUT_REQUEST:
            state={
                ...state,
                loading:true,
                authenticate:false
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state={
                ...initialState,
                authenticate:false
            }
            break;
        case authConstants.FORGETPASS_REQUEST:
            state={
                ...state,
                loading:true            
            }
            break;
        case authConstants.FORGETPASS_SUCCESS:
            state={
                ...state,
                message:action.payload.message,
                loading:false,
                forget:true
            }
            break;
        case authConstants.FORGETPASS_FAILURE:
            state={
                ...state,
                error:action.payload.error,
                loading:false,
                forget:false
            }
            break;
        case authConstants.RESET_PASSWORD_REQUEST:
            state={
                ...state,
                loading:true,
            }
            break;
        case authConstants.RESET_PASSWORD_SUCCESS:
            state={
                ...state,
                message:action.payload.message,
                reset:true,
                loading:false
            }
            break;
        case authConstants.RESET_PASSWORD_FAILURE:
            state={
                ...state,
                error:action.payload.error,
                reset:false,
                loading:false
            } 
    }
    return state;
} 

export default authReducer;