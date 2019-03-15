import React,{Component} from 'react'
import { Grid, Segment, Container, Image, Header, Icon, Dropdown, List, Label, Input, Button } from 'semantic-ui-react';
import Glass from '../../assessts/glasses-1477081_640-low.jpg.jpg'

const options = [
    { key: 1, text: ' Private ', value: 1 },
    { key: 2, text: ' Public ', value: 2 }
]

const options2 = [
    { key: 1, text: ' Paid ', value: 1 },
    { key: 2, text: ' Free ', value: 2 }
]

class EventOtherDetails extends Component {
    render() {
      return (
        <Grid columns={2} stackable >
                <Grid.Column width="12" style={{paddingRight:0}} >
                    <Grid columns={2} stackable >
                    <Grid.Column width="10" style={{paddingRight:0}} >
                        <Container style={{border:"2px solid black",display:"block",position:"absolute",paddingRight:0,paddingLeft:0}}>
                        <Image fluid src={Glass} />
                        </Container>
                        <Segment style={{width:"92%",marginLeft:"5%",position:"relative",top:"49%",borderRadius:0,boxShadow:0}}>
                        
                        <Header as='h2' color="blue">
                            <Icon name='settings' />
                            <Header.Content>
                                Event Settings
                            <Header.Subheader>Manage your event preferences</Header.Subheader>
                            </Header.Content>
                        </Header>
                        <List  selection>
                        <List.Item>
                        <Label color='teal' horizontal>
                        &nbsp;Event Group. &nbsp;&nbsp;&nbsp;
                        </Label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Dropdown  style={{width:"50%"}} clearable options={options} selection />
                        </List.Item>
                        <List.Item>
                        <Label color='teal' horizontal>
                            Event Category.
                        </Label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Dropdown  style={{width:"50%"}} clearable options={options2} selection />
                        </List.Item>
                        <List.Item>
                        <Label color='teal' horizontal>
                            Maximum No Of Guests.
                        </Label>
                        &nbsp;&nbsp;&nbsp;
                        <Input style={{width:"50%"}} placeholder='Search...' />
                        </List.Item>
                        </List>
                        <List.Item>
                        <Button.Group fluid>
                            <Button color="red">Clear Data</Button>
                            <Button.Or />
                            <Button positive>Save Data</Button>
                        </Button.Group>
                        </List.Item>
                        </Segment>
                        </Grid.Column >
                        <Grid.Column width="6" style={{paddingRight:0}} >
                        <Segment style={{width:"95%",marginLeft:"2.5%"}}>test 2</Segment>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width="4" >
                    <Segment>test 2</Segment>
                </Grid.Column>
        </Grid>
      )
    }
} 

export default EventOtherDetails