import React,{Component} from 'react'
import { Grid, Segment, Menu, Icon, Container, Header } from 'semantic-ui-react';
import NavBar from '../../components/NavBar/navBar'
import Footer from '../../components/Footer/footer'
import './EventController.css';
import EventFrontPage from '../../components/EventFrontPageDetails/EventFrontPage';
import {Route} from 'react-router-dom'
import EventAdmins from '../../components/EventAdmins/EventAdmin';
import EventOtherDetails from '../../components/EventOtherDetails/EventOtherDetails';
import {connect} from 'react-redux'
import * as oneEventActions from '../../store/index'

class EventController extends Component {

    state = { 
        activeItem: 'basic',
        headerId:1
    }

    handleItemClick = (e, name, id ) => { 
        this.setState({ activeItem: name,headerId:id })
        if(id === 2 ){
            this.redirectOtherDetailsEdit()
        }
        if(id === 3 ){
            this.redirectFrontPageEdit()
        }
        if(id === 5){
            this.redirectAdminControll()
        } 
    }

    redirectOtherDetailsEdit = () => {
        this.props.history.replace('/event-controller/'+this.props.match.params.id+"/update-event-other-details");
    }

    redirectFrontPageEdit = () => {
        this.props.history.replace('/event-controller/'+this.props.match.params.id+"/update-front-page");
    }

    redirectAdminControll = () => {
        this.props.history.replace('/event-controller/'+this.props.match.params.id+"/update-event-admins");
    }

    componentDidMount(){
        console.log("asdsad");
        console.log(this.props.match.params.id);
    }


    render(){

        const { activeItem } = this.state

        let headerContent = null
        if(this.state.headerId === 1){
            headerContent = (
                <Header as='h2'>
                    <Icon name='qrcode' />
                    <Header.Content>
                        Basic Account Settings
                        <Header.Subheader>
                            Manage your preferences
                        </Header.Subheader>
                    </Header.Content>
                </Header>
            )
        } else if(this.state.headerId === 2){
            headerContent = (
                <Header as='h2'>
                <Icon name='calendar alternate outline' />
                <Header.Content>
                    Event Other Settings
                    <Header.Subheader>
                        Manage your preferences
                    </Header.Subheader>
                </Header.Content>
            </Header>
            )
        } else if(this.state.headerId === 3) {
            headerContent = (
                <Header as='h2'>
                <Icon name='pen square' />
                <Header.Content>
                    Event Front Page Settings
                    <Header.Subheader>
                        Design Your Front Page Poster 
                    </Header.Subheader>
                </Header.Content>
            </Header>
          )
        } else if(this.state.headerId === 4){
            headerContent = (
                <Header as='h2'>
                <Icon name='file alternate outline' />
                <Header.Content>
                    Event Form Settings
                    <Header.Subheader>
                        Create Your Event Form 
                    </Header.Subheader>
                </Header.Content>
            </Header>
          )
        } else if(this.state.headerId === 5){
            headerContent = (
                <Header as='h2'>
                <Icon name='universal access' />
                <Header.Content>
                    Add Event Admins 
                    <Header.Subheader>
                        Manege Event Admins 
                    </Header.Subheader>
                </Header.Content>
            </Header>
          )
        } else if(this.state.headerId === 6){
            headerContent = (
                <Header as='h2'>
                <Icon name='podcast' />
                <Header.Content>
                    Event Category Details 
                    <Header.Subheader>
                        Manege Event Details 
                    </Header.Subheader>
                </Header.Content>
            </Header>
          )
        }

        return(
            <div>
                <NavBar />
                <Grid columns={2} stackable style={{border:"2px solid black"}}>
                    <Grid.Column width="2" style={{paddingLeft:0,paddingRight:0}} >
                        <Segment  fluid  style={{padding:0,border:"1px solid green",width:"100%"}}>
                        <Menu className="MenuScroll" fluid inverted pointing vertical style={{width:"100%",marginRight:500}}>
                            <Menu.Item 
                                className="MenuStyle"
                                name='basic'
                                active={activeItem === 'basic'}
                                onClick={()=>this.handleItemClick(this,"basic",1)}
                                style={{textAlign:"center",alignSelf: 'stretch'}}
                            >
                                     
                                     <center><Icon size='big' color='orange' name='qrcode'/></center>
                                     <br />
                                     <strong>Basic Configuration</strong>

                            </Menu.Item>
                            <Menu.Item
                            className="MenuStyle"
                            name='moreDetails'
                            active={activeItem === 'moreDetails'}
                            onClick={()=>this.handleItemClick(this,"moreDetails",2)}
                            style={{textAlign:"center",alignSelf: 'stretch'}}
                            >
                                     <center><Icon size='big' color='orange' name='calendar alternate outline'/></center>
                                     <br />
                                     <strong>More Details</strong>
                            </Menu.Item>
                            <Menu.Item
                            className="MenuStyle"
                            name='frontPage'
                            active={activeItem === 'frontPage'}
                            onClick={()=>this.handleItemClick(this,"frontPage",3)}
                            style={{textAlign:"center",alignSelf: 'stretch'}}
                            >
                                     <center><Icon size='big' color='orange' name='pen square'/></center>
                                     <br />
                                     <strong>Front Page</strong>
                            </Menu.Item>
                            <Menu.Item
                            className="MenuStyle"
                            name='form'
                            active={activeItem === 'form'}
                            onClick={()=>this.handleItemClick(this,"form",4)}
                            style={{textAlign:"center",alignSelf: 'stretch'}}
                            >
                                     <center><Icon size='big' color='orange' name='file alternate outline'/></center>
                                     <br />
                                     <strong>Event Form Config</strong>
                            </Menu.Item>
                            <Menu.Item
                            className="MenuStyle"
                            name='admins'
                            active={activeItem === 'admins'}
                            onClick={()=>this.handleItemClick(this,"admins",5)}
                            style={{textAlign:"center",alignSelf: 'stretch'}}
                            >
                                     <center><Icon size='big' color='orange' name='universal access'/></center>
                                     <br />
                                     <strong>Event Admins</strong>
                            </Menu.Item>
                            <Menu.Item
                            className="MenuStyle"
                            name='ecategory'
                            active={activeItem === 'ecategory'}
                            onClick={()=>this.handleItemClick(this,"ecategory",6)}
                            style={{textAlign:"center",alignSelf: 'stretch'}}
                            >
                                     <center><Icon size='big' color='orange' name='podcast'/></center>
                                     <br />
                                     <strong>Event Category Details</strong>
                            </Menu.Item>
                        </Menu>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width="14" style={{paddingLeft:0,paddingRight:0,width:"100%"}}>
                            <Container fluid style={{height:602,overflow:"auto"}}>
                                <div style={{paddingTop:"1.5%",paddingBottom:"1.5%"}}>
                                {headerContent}
                                </div>
                                
                                    <Route path={this.props.match.path +"/update-front-page"} component={EventFrontPage}/>
                                    <Route path={this.props.match.path +"/update-event-admins"} component={EventAdmins} />
                                    <Route path={this.props.match.path +"/update-event-other-details"} component={EventOtherDetails} />
                                
                            </Container>
                    </Grid.Column>
                </Grid>
                <Footer />
            </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(EventController);