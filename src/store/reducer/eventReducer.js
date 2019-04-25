import * as eventActions from '../actions/actionTypes';
import {updatedObject} from '../shared/utility'
import { eventFail } from '../actions/eventActions';

const initialState = {
    eventStart:false,
    eventErrors:false,
    eventLoad:false,
    eventSuccess:false
}

const authStart = (state,action)=>{
    return updatedObject (state,{
        eventStart:true,
        eventErrors:false,
        eventLoad:true,
        eventSuccess:false
    })
}

const eventSuccess = (state,action) => {
    return updatedObject (state,{
        eventStart:false,
        eventErrors:false,
        eventLoad:false,
        eventSuccess:true
    })
}

const eventErrors = (state,action) => {
    return updatedObject (state,{
        eventStart:false,
        eventErrors:true,
        eventLoad:false,
        eventSuccess:false
    })
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case eventActions.EVENT_START:
            return authStart(state,action);
        case eventActions.EVENT_SUCCESS:
            return eventSuccess(state,action);
        case eventActions.EVENT_FAIL:
            return eventFail(state,action);
        default:
            return state;
    }
}

export default reducer;