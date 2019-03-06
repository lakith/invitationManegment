import * as eventActions from './actionTypes'
import axios from '../../axios-base'



export const eventStart = ()=>{
    return {
        type:eventActions.EVENT_START
    }
}

export const eventSuccess = () => {
    return{
        type:eventActions.EVENT_SUCCESS
    }
}

export const eventFail = (message) => {
    return{
        type:eventActions.EVENT_FAIL,
        error:message
    }
}

export const eventSubmit = (eventData,token) => {

      return dispatch => {
        dispatch(eventStart());
        const formData = new FormData();
        formData.append("eventHeading",eventData.eventHeading)
        formData.append("eventStartDate",eventData.eventStartDate)
        formData.append("eventEndDate",eventData.eventEndDate)
        formData.append("eventPlace",eventData.eventPlace)
        formData.append("eventTypeId",eventData.eventTypeId)
        formData.append("thumbnail",eventData.thumbnail)
        formData.append("eventHostedUrl",eventData.eventHostedUrl)


        var headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }


        axios.post('event/eventBaseSave',formData,{headers:{...headers}})
        .then((response)=>{
            console.log(response)
            dispatch(eventSuccess());
        }).catch((error)=> {
            dispatch(eventFail(error.response.data.message));
        })
    }

}