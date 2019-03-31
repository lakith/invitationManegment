import * as eventActions from '../actions/actionTypes';
import {updatedObject} from '../shared/utility'

const initialState = {
    allEventLoad:false,
    allEventError:false,
    allEventData:null
}

const allEventStart = (state,action)=>{
    return updatedObject (state,{
        allEventLoad:true,allEventError:false
    });
}

const allEventFail = (state,action)=>{
    return updatedObject (state,{
        allEventLoad:false,allEventError:true,allEventData:null
    });
}

const allEventSuccess = (state,action)=>{
    return updatedObject (state,{
        allEventLoad:false,allEventError:false,allEventData:action.allEvents
    });
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case eventActions.ALL_EVENT_START:
            return allEventStart(state,action);
        case eventActions.ALL_EVENT_SUCCESS:
            return allEventSuccess(state,action);
        case eventActions.ALL_EVENT_FAIL:
            return allEventFail(state,action);
        default:
            return state;
    }
}

export default reducer;