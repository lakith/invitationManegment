import React,{Component} from 'react'
import { Grid, Segment, Container, Image, Header, Icon, Dropdown, List, Label, Input, Button, Card } from 'semantic-ui-react';
import Glass from '../../assessts/glasses-1477081_640-low.jpg.jpg'
import * as oneEventActions from '../../store/index'
import {connect} from 'react-redux'
import axios from '../../axios-base'
import {NotificationContainer, NotificationManager} from 'react-notifications';

const options = [
    { key: 1, text: ' Private ', value: 1 },
    { key: 2, text: ' Public ', value: 2 }
]

const options2 = [
    { key: 1, text: ' Paid ', value: 1 },
    { key: 2, text: ' Free ', value: 2 }
]

// const description = [
//     'Amy is a violinist with 2 years experience in the wedding industry.',
//     'She enjoys the outdoors and currently resides in upstate New York.',
//   ].join(' ')
  
class EventOtherDetails extends Component {

    state={
        group:"",
        category:"",
        guests:0,
        loading:false
    }

    componentDidMount() {
        if(this.props.eventData){
            if(this.props.eventData.eventId !== this.props.match.params.id){
                this.props.onEventInit(this.props.match.params.id,this.props.accessToken);
            }
        } else {
            this.props.onEventInit(this.props.match.params.id,this.props.accessToken);
        }
    }

    handleGroup = (e, { value }) => {
        this.setState({
            group:value
        })
    }

    handleCategory = (e, { value }) => {
        this.setState({
            category: value
        })
    }   

    handleGuests = (event) => {
        this.setState({
            guests:event.target.value
        });
    }

    submitData = (event) => {
        event.preventDefault();
        if(this.state.group === ""){
            NotificationManager.error('Error message', 'You must Select an event Group', 3000);
        } else if (this.state.category === ""){ 
            NotificationManager.error('Error message', 'You must Select an event Category', 3000);
        } else if (this.state.guests === 0 ){
            NotificationManager.error('Error message', 'You must specify guests', 3000);
        } else {

            this.setState({
                loading:true
            })

            let data = {
                eventId: this.props.match.params.id,
                maximumNumberOfGuests: this.state.guests,
                eventCategoryId: this.state.category,
                eventGroupId: this.state.group
            }

           axios({
               method:'post',
               url:"/event/other-data",
               data:data
           }).then((response)=>{
                this.setState({
                    loading:false
                })
                NotificationManager.success('Success message', 'Data Submitted Successfully.');
           }).catch((error)=>{
                this.setState({
                    loading:false
                })
                NotificationManager.error('Error message', 'Some thing went wrong', 3000);
           })
        }
    }

    render() {

        let eventCategory = null
        let eventGroup = null
        let maximum = null
        if(this.props.eventData){
            eventCategory = "Free event";
            eventGroup = "Public event"
            if(this.props.eventData.paidEvent){
                eventCategory = "Paid event"
            } 
            if(this.props.eventData.eventPrivate){
                eventCategory = "Private event"
            }
            maximum = this.props.eventData.numberOfGuests;
        }

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
                        <Dropdown  style={{width:"50%"}} clearable options={options} selection onChange={this.handleGroup} value={this.state.group} />
                        </List.Item>
                        <List.Item>
                        <Label color='teal' horizontal>
                            Event Category.
                        </Label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Dropdown  style={{width:"50%"}} clearable options={options2} selection onChange={this.handleCategory} value={this.state.category} />
                        </List.Item>
                        <List.Item>
                        <Label color='teal' horizontal>
                            Maximum No Of Guests.
                        </Label>
                        &nbsp;&nbsp;&nbsp;
                        <Input style={{width:"50%"}} placeholder='No of Guests...' onChange={this.handleGuests} value={this.state.guests} />
                        </List.Item>
                        </List>
                        <List.Item>
                        <Button.Group fluid>
                            <Button  color="red">Clear Data</Button>
                            <Button.Or />
                            <Button loading={this.state.loading} onClick={this.submitData} positive>Save Data</Button>
                        </Button.Group>
                        </List.Item>
                        </Segment>
                        </Grid.Column >
                        <Grid.Column width="6" style={{paddingRight:0}} >
                        <Card style={{width:"95%",marginLeft:"2.5%"}}>
                            <Card.Content header='Current Event Settings' style={{paddingBottom:"2.5%"}} />
                            <Card.Content >
                            <div style={{paddingBottom:"3.3%"}}>
                            <Label color='teal' horizontal>
                                Event Group.
                            </Label>
                                <span style={{color:"green",paddingLeft:"25%"}}><strong>{eventGroup}</strong></span>
                            </div>
                            <div style={{paddingBottom:"3.3%"}}>
                            <Label color='teal' horizontal>
                                Event Category.
                            </Label>
                            <span style={{color:"green",paddingLeft:"20%"}}><strong>{eventCategory}</strong></span>
                            </div>
                            <div>
                            <Label color='teal' horizontal>
                                Maximum No Of Guests.
                            </Label>
                            <span style={{color:"green",color:"green",paddingLeft:"4%"}}><strong>{maximum}</strong></span>
                            </div>
                            </Card.Content>
                            <Card.Content extra>
                            <Icon name='user' />
                                 4 Friends
                            </Card.Content>
                        </Card>
                        {/* <Segment style={{width:"95%",marginLeft:"2.5%"}}>
                        
                        </Segment> */}
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width="4" >
                    <Segment>test 2</Segment>
                </Grid.Column>
                <NotificationContainer/>
        </Grid>
      )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onEventInit : (eventID,accessToken) => dispatch(oneEventActions.OneEventGetData(eventID,accessToken))
    }
}

const mapStateToProps = (state) => { 
    return{
        eventStart : state.oneEvent.oneEventLoad,
        eventFail : state.oneEvent.oneEventError, 
        eventData : state.oneEvent.oneEventData,
        accessToken : state.auth.accessToken
    }
 };

export default connect(mapStateToProps,mapDispatchToProps) (EventOtherDetails)