import * as authActions from './actionTypes'
import axios from '../../axios-base'

export const oneEventStart = () => {
    return{
        type:authActions.ONE_EVENT_START
    }
}

export const oneEventSuccess = (eventData) => {
    return{
        type:authActions.ONE_EVENT_SUCCESS,
        eventData:eventData
    }
}

export const oneEventSubmitError = (err) => {
    return{
        type:authActions.ONE_EVENT_FAIL,
        errors:err
    }
}

export const OneEventGetData = (eventId,accessToken) => {
    return dispatch => {
        dispatch(oneEventStart())
        axios({
            method:'get',
            url:'/event/get-one-event-data?event-id='+eventId,
            headers: {
                Authorization: 'Bearer ' + accessToken
              }

        }).then((response) => {
           console.log(response.data);
           dispatch(oneEventSuccess(response.data));
        }).catch((err)=>{
            dispatch(oneEventSubmitError(err.data));
        })
    }
}