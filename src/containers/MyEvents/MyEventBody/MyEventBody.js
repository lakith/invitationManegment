import React,{Component} from 'react';
import axios from '../../../axios-base'
import { Grid, Card, Image, Icon, Segment, Dimmer, Loader, Message } from 'semantic-ui-react';

const loadstate = {
    value:false
}

class MyEventBody extends Component {
    
    state={
        events : null,
        error : false,
        loading:false,
        displayNoContent : false
    }

    componentDidMount(){
        console.log(this.props)
    }


    componentDidUpdate(prevProps,prevState){



        

        // axios({
        //         method:'get',
        //         url:'staffUser/my-events',
        //         headers: {
        //             Authorization: 'Bearer ' + this.props.token
        //             }
        
        //         }).then((response) => {
        //             if(!this.state.events && this.state.events !==response.data){
        //                 this.setState({events:response.data})
        //                 loadstate.value = false
        //             }
        //             console.log(this.state.events);
        //         }).catch((err)=>{
        //             this.setState({error:err.response.data.message});
        //         })

        if(this.props.isPaid === "paid"){
            //this.setState({loading:true});
            axios({
                method:'get',
                url:'event-user/filter-by-category?paid-event='+true+'&free-event='+false,
                headers: {
                    Authorization: 'Bearer ' + this.props.token
                  }
            }).then((response) => {
                
                if(!this.state.events && this.state.events !==response.data){
                    this.setState({events : response.data});
                   // this.setState({loading:false});
                    if(!this.state.events){
                        this.setState({displayNoContent:true});
                    }    
                }

            }).catch((err)=>{
                this.setState({loading:false,err:true});
            })
    
        } else if(this.props.isPaid === "free"){
  //          this.setState({loading:true});
            axios({
                method:'get',
                url:'event-user/filter-by-category?paid-event='+false+'&free-event='+true,
                headers: {
                    Authorization: 'Bearer ' + this.props.token
                  }
    
            }).then((response) => {
                if(!this.state.events && this.state.events !==response.data){
                    this.setState({events : response.data});
               //     this.setState({loading:false});
                    if(!this.state.events){
                        this.setState({displayNoContent:true});
                    }    
                }
            }).catch((err)=>{
                this.setState({loading:false,err:true});

            })
        } else if(this.props.isPast === "old"){
            this.setState({loading:true});
            axios({
                method:'get',
                url:'event-user/filter-by-date?old-event='+true+'&new-event='+false,
                headers: {
                    Authorization: 'Bearer ' + this.props.token
                  }
    
            }).then((response) => {
                if(!this.state.events && this.state.events !==response.data){
                    this.setState({events : response.data});
                    this.setState({loading:false});
                    if(!this.state.events){
                        this.setState({displayNoContent:true});
                    }    
                }
            }).catch((err)=>{
                this.setState({loading:false,err:true});
            })
        } else if(this.props.isPast === "new"){
            // this.setState({loading:true});
            axios({
                method:'get',
                url:'event-user/filter-by-date?old-event='+false+'&new-event='+true,
                headers: {
                    Authorization: 'Bearer ' + this.props.token
                  }
    
            }).then((response) => {
                if(!this.state.events && this.state.events !==response.data){
                    this.setState({events : response.data});
                    // this.setState({loading:false});
                    if(!this.state.events){
                        this.setState({displayNoContent:true});
                    }    
                }
    
            }).catch((err)=>{
                // this.setState({loading:false});
                // this.setState({err:true});
            })
    
        } else if(this.props.eventTypeId !== 0) {
            // this.setState({loading:true});
            axios({
                method:'get',
                url:'event-user/filter-by-event-type?event-type='+this.props.eventTypeId,
                headers: {
                    Authorization: 'Bearer ' + this.props.token
                  }
    
            }).then((response) => {
                if(!this.state.events && this.state.events !==response.data){
                    this.setState({events : response.data});
                    // this.setState({loading:false});
                    if(!this.state.events){
                        this.setState({displayNoContent:true});
                    }    
                }
            }).catch((err)=>{
                this.setState({loading:false,err:true});
            })
        } else {
            // this.setState({loading:true});
            axios({
                method:'get',
                url:'staffUser/my-events',
                headers: {
                    Authorization: 'Bearer ' + this.props.token
                  }
    
            }).then((response) => {
                if(!this.state.events && this.state.events !== response.data){
                    this.setState({events : response.data});
                    // this.setState({loading:false});
                    if(!this.state.events){
                        this.setState({displayNoContent:true});
                    }    
                }
            }).catch((err)=>{
                // this.setState({loading:false});
                // this.setState({err:true});
            })
        }
    }
  

    

    render(){
        // return(
        //     <div></div>
        // )

        let transEvents = null;
        if(this.state.events){
            transEvents =  this.state.events.map(event=>(
                <Grid.Column key={event.eventId}>
                    <Card fluid>
                    <Image src={event.eventThumbnail} style={{height:220}} />
                    <Card.Content>
                    <Card.Header>{event.eventName}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{event.startDate}</span>
                    </Card.Meta>
                    <Card.Description>
                        <strong>Event Place &nbsp;</strong>{event.eventPlace}
                        <br />
                        <strong>Event Hosted Url &nbsp;</strong>{event.eventHostedUrl}
                    </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    
                    <a href>
                        <Icon name='user' />
                        {event.numberOfGuests} Guests
                    </a>
                    </Card.Content>
                </Card>
            </Grid.Column>
            ))
        }
    

        let dimmer = (
            <Segment>
                <Dimmer active>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
            </Segment>
        )
        
        let displayError = null
        if(this.state.error){
           displayError = ( 
                <Message
                    error
                    header='Something Went Wrong With The Connection'
                    list={[
                    'Plese make sure that you have been logged in with the correct procedure.',
                    'Check Your Internet Connectivty.',
                    ]}
                />
           )
        }
    
        let noContent = null;
        if(this.state.displayNoContent) {
            noContent = (
                <Message warning>
                <Message.Header>There Is No Content To Show!</Message.Header>
                <p>Visit Our Event Registration Page To Add Events.</p>
                <Icon name='settings' />
              </Message>
            )
        }
    
    return(
                    
        <React.Fragment>
            {console.log("render data")}
            {console.log(this.props.token)}
          {this.state.error? displayError:loadstate.value ? dimmer : this.state.displayNoContent? noContent: transEvents} 
          {/* {events} */}
        </React.Fragment>
    );
     }
}

export default MyEventBody;