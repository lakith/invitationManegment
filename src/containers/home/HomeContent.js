import React,{Component} from 'react';
import {  Card, Image, Icon, Grid } from 'semantic-ui-react';

class HomeContent extends Component {

    render(){
        return(
            <React.Fragment>
                 <Grid.Column >
                        <Card fluid>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' style={{height:220}} />
                        <Card.Content>
                        <Card.Header>Matthew</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2015</span>
                        </Card.Meta>
                        <Card.Description>
                            <strong>Event Place &nbsp;</strong>Nashville
                            <br />
                            <strong>Event Hosted Url &nbsp;</strong>google.com
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        
                        <a href>
                            <Icon name='user' />
                            50 Guests
                        </a>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column >
                        <Card fluid>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' style={{height:220}} />
                        <Card.Content>
                        <Card.Header>Matthew</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2015</span>
                        </Card.Meta>
                        <Card.Description>
                            <strong>Event Place &nbsp;</strong>Nashville
                            <br />
                            <strong>Event Hosted Url &nbsp;</strong>google.com
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        
                        <a href>
                            <Icon name='user' />
                            50 Guests
                        </a>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column >
                        <Card fluid>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' style={{height:220}} />
                        <Card.Content>
                        <Card.Header>Matthew</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2015</span>
                        </Card.Meta>
                        <Card.Description>
                            <strong>Event Place &nbsp;</strong>Nashville
                            <br />
                            <strong>Event Hosted Url &nbsp;</strong>google.com
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        
                        <a href>
                            <Icon name='user' />
                            50 Guests
                        </a>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </React.Fragment>
        )
    }

}

export default HomeContent;