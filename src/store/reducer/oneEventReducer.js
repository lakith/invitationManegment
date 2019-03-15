import * as eventActions from '../actions/actionTypes';
import {updatedObject} from '../shared/utility'

const initialState = {
    oneEventLoad:false,
    oneEventError:false,
    oneEventData:null
}

const oneEventStart = (state,action)=>{
    return updatedObject (state,{
        oneEventLoad:true,oneEventError:false
    })
}

const oneEventFail = (state,action)=>{
    return updatedObject (state,{
        oneEventLoad:false,oneEventError:true
    })
}

const oneEventSuccess = (state,action)=>{
    return updatedObject (state,{
        oneEventLoad:false,oneEventError:false,oneEventData:action.eventData
    })
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case eventActions.ONE_EVENT_START:
            return oneEventStart(state,action);
        case eventActions.ONE_EVENT_SUCCESS:
            return oneEventSuccess(state,action);
        case eventActions.ONE_EVENT_FAIL:
            return oneEventFail(state,action);
        default:
            return state;
    }
}

export default reducer;