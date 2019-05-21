import React,{Component} from 'react';
import {  Card, Image, Icon, Grid, Message } from 'semantic-ui-react';
import {Link} from 'react-router-dom'


class HomeContent extends Component {
    render(){
        let transEvents = null;
        let eventUrl = "/view-event?event=";
        if(this.props.eventData){
                transEvents =  this.props.eventData.map(event=>(
                        <Grid.Column key={event.eventId}>
                            <Link to={"/view-event?event="+event.eventId}>
                            <Card link fluid style={{width:"90%"}}>
                            <Image 
                            size="large"
                            src={event.eventThumbnail}
                            label={{ as: 'a', color: event.closed?"red":"green", content: event.closed?"closed":"pending", icon: event.closed?"window close outline":"rss", ribbon: true }}
                            style={{height:"60%"}} />
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
                        </Card></Link>
                    </Grid.Column>
               
                ))
            }
        
    
           
            let displayError = null
            if(this.props.myEventError){
               displayError = ( 
                <>
                <Grid.Column ></Grid.Column>
                <Grid.Column >
                    <Message
                        error
                        header='Something Went Wrong With The Connection'
                        list={[
                        'Plese make sure that you have been logged in with the correct procedure.',
                        'Check Your Internet Connectivty.',
                        ]}
                    />
                </Grid.Column>
                <Grid.Column ></Grid.Column>
                </>
               )
            }
        
            let noContent = null;
            if(!this.props.eventData) {
                noContent = (
                    <>
                    <Grid.Column ></Grid.Column>
                    <Grid.Column >
                        <Message warning>
                            <Message.Header>There Is No Content To Show!</Message.Header>
                                <p>Visit Our Event Registration Page To Add Events.</p>
                                    <Icon style={{textAligh:"center"}} name='settings' />
                        </Message>
                    </Grid.Column>
                    <Grid.Column ></Grid.Column>
                    </>
                )
            }
    
            let content = null;
            if(transEvents){
                content = transEvents
            } else if(noContent) {
                content = noContent;
            } else if (displayError) {
                content = displayError
            } else {
                content = displayError
            }
    
            return (
                <React.Fragment>
                    {content}
                </React.Fragment>
            )
        }
}

export default HomeContent;