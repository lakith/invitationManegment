import * as authActions from './actionTypes'
import axios from '../../axios-base'

export const allEventStart = () => {
    return{
        type:authActions.ALL_EVENT_START
    }
}

export const allEventSuccess = (data) => {
    return{
        type:authActions.ALL_EVENT_SUCCESS,
        allEvents:data
    }
}

export const allEvenFail = (error) => {
    return{
        type:authActions.ALL_EVENT_FAIL,
        error:error
    }
}


export const allEventPaid = (currentData) => {
    return dispatch => {
        dispatch(allEventStart());
        axios({
            method:'get',
            url:'event/get-all-free-or-paid-events?free='+false+'&paid='+true
        }).then((response) => {
                console.log("all money - paid");
                console.log(response);
                if(currentData !== response.data){
                    dispatch(allEventSuccess(response.data)) 
                }
        }).catch((err)=>{
                dispatch(allEvenFail(err.response))
        })
    }
}

export const allEventFree = (currentData) => {
    return dispatch => {
        dispatch(allEventStart());
        axios({
            method:'get',
            url:'event/get-all-free-or-paid-events?free='+true+'&paid='+false
            }).then((response) => {
                    console.log("money - free");
                    console.log(response);
                    if(currentData !== response.data){
                        dispatch(allEventSuccess(response.data)) 
                    }    
            }).catch((err)=>{
                    dispatch(allEvenFail(err.response))
            })
    }
}

export const allEventPublic = (currentData) => {
    return dispatch => {
        dispatch(allEventStart());
        axios({
            method:'get',
            url:'event/get-all-public-or-private-events?private-event='+false+'&public-event='+true
            }).then((response) => {
                    console.log("money - free");
                    console.log(response);
                    if(currentData !== response.data){
                        dispatch(allEventSuccess(response.data)) 
                    }    
            }).catch((err)=>{
                    dispatch(allEvenFail(err.response))
            })
    }
}
export const allEventPrivate = (currentData) => {
    return dispatch => {
        dispatch(allEventStart());
        axios({
            method:'get',
            url:'event/get-all-public-or-private-events?private-event='+true+'&public-event='+false
            }).then((response) => {
                    console.log("money - free");
                    console.log(response);
                    if(currentData !== response.data){
                        dispatch(allEventSuccess(response.data)) 
                    }    
            }).catch((err)=>{
                    dispatch(allEvenFail(err.response))
            })
    }
}

export const allEventEventId = (eventTypeId,currentData) => {
    return dispatch => {
        axios({
            method:'get',
            url:'event/get-all-events-by-event-type?eventTypeId='+eventTypeId
            }).then((response) => {
                console.log("event id present");
                console.log(response);
                if(currentData !== response.data){
                    dispatch(allEventSuccess(response.data)) 
                }
        }).catch((err)=>{
                    dispatch(allEvenFail(err.response))
        })
    }
}

export const allEventDefault = () => {
    return dispatch => {
        axios({
            method:'get',
            url:'event/get-all-events'
            }).then((response) => {
                dispatch(allEventSuccess(response.data)) 
        }).catch((err)=>{
                dispatch(allEvenFail(err.response))
        })
    }
}

