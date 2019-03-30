import React, { Component } from 'react';
import NavBar from '../../components/NavBar/navBar';
import Footer from '../../components/Footer/footer';
import { Grid, Container, Image,  Header, Card, Icon, Dropdown, Input, Responsive } from 'semantic-ui-react';
import main from "../../assessts/main.jpg"
import mainMiddle from '../../assessts/main_middle.png'
import upcomming from '../../assessts/upcoming.jpg'
import HomeContent from './HomeContent';
import {connect} from 'react-redux';
import * as allEventActions from '../../store/index'


class Home extends Component {

    selectHandler = (selector) =>{
        console.log(selector);
    }

    render(){
        return(
            <div>
                <NavBar /> 
                 <Grid className="hideevent" columns={1}>
                        <Container fluid>
                            <Image fluid src={main} />
                        </Container>
                 </Grid>
                 <Grid columns={3} style={{marginTop:"2%",marginBottom:"2%"}}>
                    <Grid.Column width={1}>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <Container fluid style={{textAlign:"center",marginTop:"3%"}} >
                            <font size="5" ><Header size="huge" style={{fontFamily:"'Raleway', 'sans-serif'",fontWeight:300}} >Upcomming Events</Header></font>
                            <h3 style={{fontFamily:"'Raleway', 'sans-serif'",color:"#858484",fontWeight:300}}>Here is a list of the upcoming events. Register and RSVP now to secure your place</h3>
                        </Container>
                        <Container fluid style={{textAlign:"center",marginTop:"3%"}} >
                                <Card fluid>
                                    <Image src={upcomming} />
                                    <Card.Content style={{textAlign:"left"}}>
                                    <Card.Header style={{fontFamily:"'Raleway', 'sans-serif'",fontWeight:300}}>Event manegement short course by melbourn university australian center of event manegement</Card.Header>
                                    <Card.Meta style={{paddingTop:"0.5%"}}>
                                        <span className='date'>Event Date : May 10<sup>th</sup> 2019.</span>
                                    </Card.Meta>
                                    <Card.Description style={{fontFamily:"'Raleway', 'sans-serif'",fontWeight:300}}>A qualification in Events will provide you with multitude career options locally and globally. If you are energetic and organized then a career in Events might be for you.</Card.Description>
                                    </Card.Content>
                                    <Card.Content textAlign="right" extra>
                                    <a>
                                        <Icon name='user' />
                                        22 Guests
                                    </a>
                                    </Card.Content>
                                </Card>
                        </Container>
                    </Grid.Column>
                    <Grid.Column  width={1}>
                    </Grid.Column>
                 </Grid>
                 <Grid columns={1} style={{marginTop:"2%",marginBottom:"2%"}}>
                   
                    <Grid.Column width={16}>
                        <div style={{textAlign:"center"}}>
                            <Dropdown style={{fontFamily:"'Raleway', 'sans-serif'",color:"#858484",fontWeight:300,textAlign:"middle"}} text='Clik here to filer events..'  icon='filter'  floating labeled button style={{backgroundColor:"#F7F7F7"}} className='icon'>
                                <Dropdown.Menu>
                                <Dropdown.Header content='Search Issues' />
                                <Input icon='search' iconPosition='left' name='search' />
                                <Dropdown.Header icon='tags' content='Filter by tag' />
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={()=>this.selectHandler(1)} label={{ color: 'red', empty: true, circular: true }} text='Birthday' />
                                <Dropdown.Item onClick={()=>this.selectHandler(2)}  label={{ color: 'blue', empty: true, circular: true }} text='Wedding' />
                                <Dropdown.Item onClick={()=>this.selectHandler(3)}  label={{ color: 'teal', empty: true, circular: true }} text='Holiday Party' />
                                <Dropdown.Item onClick={()=>this.selectHandler(4)}  label={{ color: 'green', empty: true, circular: true }} text='Baby Shower' />
                                <Dropdown.Item onClick={()=>this.selectHandler(5)}  label={{ color: 'pink', empty: true, circular: true }} text='Show or Performance' />
                                <Dropdown.Item onClick={()=>this.selectHandler(6)}  label={{ color: 'violet', empty: true, circular: true }} text='Other' />
                                <Dropdown.Item onClick={()=>this.selectHandler(7)}  label={{ color: 'brown', empty: true, circular: true }} text='Free Events' />
                                <Dropdown.Item onClick={()=>this.selectHandler(8)}  label={{ color: 'yellow', empty: true, circular: true }} text='Paid Events' />
                                <Dropdown.Item onClick={()=>this.selectHandler(9)}  label={{ color: 'orange', empty: true, circular: true }} text='Private Events' />
                                <Dropdown.Item onClick={()=>this.selectHandler(10)}  label={{ color: 'grey', empty: true, circular: true }} text='Public Events' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </Grid.Column>
                 </Grid>
                 <Grid container columns={3} doubling stackable style={{marginBottom:"2%",marginTop:"2%"}}>
                     <HomeContent />

                </Grid>
                 <Grid columns={1} style={{marginTop:"2%",marginBottom:"2%"}}>
                        <Container fluid>
                            <Image fluid src={mainMiddle} />
                        </Container>
                 </Grid>
                <Footer />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        OnAllEventPaid : (currentdata) => dispatch(allEventActions.allEventPaid(currentdata)),
        OnAllEventFree : (currentdata) => dispatch(allEventActions.allEventFree(currentdata)),
        OnAllEventPrivate : (currentdata) => dispatch(allEventActions.allEventPrivate(currentdata)),
        OnAllEventPublic : (currentdata) => dispatch(allEventActions.allEventPublic(currentdata)),
        OnAllEventByEventType : (eventId,currentdata) => dispatch(allEventActions.allEventEventId(eventId,currentdata)),
        OnAllEventDefault : ()=> dispatch(allEventActions.allEventDefault())
    }
}

const mapStateToProps = state => {
    return {
        accessToken:state.auth.accessToken,
        allEventLoad:state.allEvent.allEventLoad,
        allEventError:state.allEvent.allEventError,
        alleventData:state.allEvent.allEventData
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);