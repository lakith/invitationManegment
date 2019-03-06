import * as eventActions from '../actions/actionTypes';
import {updatedObject} from '../shared/utility'

const initialState = {
    eventStart:false,
    eventErrors:null
}

const authStart = (state,action)=>{
    return updatedObject (state,{
        eventStart:true
    })
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case eventActions.EVENT_START:
            return authStart(state,action);
        default:
            return state;
    }
}

export default reducer;