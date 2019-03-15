import * as authActions from './actionTypes'
import axios from '../../axios-base'

export const myEventStart = () => {
    return{
        type:authActions.MY_EVENT_START
    }
}

export const myEventSuccess = (data) => {
    return{
        type:authActions.MY_EVENT_SUCCESS,
        myEvents:data
    }
}

export const myEvenFail = (error) => {
    return{
        type:authActions.MY_EVENT_FAIL,
        error:error
    }
}


export const myEventPaid = (token,currentData) => {
    return dispatch => {
        dispatch(myEventStart());
        axios({
            method:'get',
            url:'event-user/filter-by-category?paid-event='+true+'&free-event='+false,
            headers: {
                Authorization: 'Bearer ' + token
              }
        }).then((response) => {
                console.log("money - paid");
                console.log(response);
                if(currentData !== response.data){
                    dispatch(myEventSuccess(response.data)) 
                }
        }).catch((err)=>{
                dispatch(myEvenFail(err.response))
        })
    }
}

export const myEventFree = (token,currentData) => {
    return dispatch => {
        dispatch(myEventStart());
        axios({
            method:'get',
            url:'event-user/filter-by-category?paid-event='+false+'&free-event='+true,
            headers: {
                Authorization: 'Bearer ' + token
              }
            }).then((response) => {
                    console.log("money - free");
                    console.log(response);
                    if(currentData !== response.data){
                        dispatch(myEventSuccess(response.data)) 
                    }    
            }).catch((err)=>{
                    dispatch(myEvenFail(err.response))
            })
    }
}

export const myEventOld = (token,currentData) => {
    return dispatch => {
        dispatch(myEventStart());
        axios({
            method:'get',
            url:'event-user/filter-by-date?old-event='+true+'&new-event='+false,
            headers: {
                Authorization: 'Bearer ' + token
              }
            }).then((response) => {
                    console.log("time present - old");
                    console.log(response);
                    if(currentData !== response.data){
                        dispatch(myEventSuccess(response.data)) 
                    }  
            }).catch((err)=>{
                    dispatch(myEvenFail(err.response))
            })
    }
}


export const myEventNew = (token,currentData) => {
    return dispatch => {
        dispatch(myEventStart());
        axios({
            method:'get',
            url:'event-user/filter-by-date?old-event='+false+'&new-event='+true,
            headers: {
                Authorization: 'Bearer ' + token
              }
            }).then((response) => {
                console.log("time present - new");
                console.log(response);
                if(currentData !== response.data){
                    dispatch(myEventSuccess(response.data)) 
                } 
        }).catch((err)=>{
                dispatch(myEvenFail(err.response))
        })
    }
}

export const myEventEventId = (token,eventTypeId,currentData) => {
    return dispatch => {
        axios({
            method:'get',
            url:'event-user/filter-by-event-type?event-type='+eventTypeId,
            headers: {
                Authorization: 'Bearer ' +token
              }

            }).then((response) => {
                console.log("event id present");
                console.log(response);
                if(currentData !== response.data){
                    dispatch(myEventSuccess(response.data)) 
                }
        }).catch((err)=>{
                dispatch(myEvenFail(err.response))
        })
    }
}

export const myEventDefault = (token) => {
    return dispatch => {
        axios({
            method:'get',
            url:'staffUser/my-events',
            headers: {
                Authorization: 'Bearer ' + token
              }
            }).then((response) => {
                console.log("else all");
                console.log(response);
                    dispatch(myEventSuccess(response.data)) 
        }).catch((err)=>{
                dispatch(myEvenFail(err.response))
        })
    }
}

