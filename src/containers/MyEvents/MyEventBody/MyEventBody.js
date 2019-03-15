import React,{Component} from 'react';
import { Grid, Card, Image, Icon, Message } from 'semantic-ui-react';
class MyEventBody extends Component {
    
    render(){
    let transEvents = null;
    if(this.props.eventData){
            transEvents =  this.props.eventData.map(event=>(
               
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

export default  MyEventBody;