import {authConstants} from '../action/constants';

const initialState = {
    token:null,
    user:{},
    resetToken:null,
    authenticate:false,
    loading:false,
    message:'',
    error:null
}

const authReducer = (state = initialState,action) =>{
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            state ={
                ...state,
                authenticate:false,
                loading:true
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
        case authConstants.FORGETPASS_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case authConstants.FORGETPASS_SUCCESS:
            state={
                ...state,
                resetToken:action.payload.resetToken,
                loading:false
            }
            break;
        case authConstants.FORGETPASS_FAILURE:
            state={
                ...state,
                error:action.payload.error,
                loading:false
            }
            break;
        case authConstants.RESETPASS_REQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case authConstants.RESETPASS_SUCCESS:
            state={
                ...state,
                message:action.payload.message,
                resetToken:action.payload.resetToken,
                loading:false
            }
            break;
        case authConstants.RESETPASS_FAILURE:
            state={
                ...state,
                error:action.payload.error,
                resetToken:action.payload.resetToken,
                loading:false
            }
    }
    return state;
} 

export default authReducer;