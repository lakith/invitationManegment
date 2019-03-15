import * as eventActions from '../actions/actionTypes';
import {updatedObject} from '../shared/utility'

const initialState = {
    myEventLoad:false,
    myEventError:false,
    myEventData:null
}

const eventStart = (state,action)=>{
    return updatedObject (state,{
        myEventLoad:true,myEventError:false
    })
}

const eventFail = (state,action)=>{
    return updatedObject (state,{
        myEventLoad:false,myEventError:true
    })
}

const eventSuccess = (state,action)=>{
    return updatedObject (state,{
        myEventLoad:false,myEventError:false,myEventData:action.myEvents
    })
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case eventActions.MY_EVENT_START:
            return eventStart(state,action);
        case eventActions.MY_EVENT_SUCCESS:
            return eventSuccess(state,action);
        case eventActions.MY_EVENT_FAIL:
            return eventFail(state,action);
        default:
            return state;
    }
}

export default reducer;