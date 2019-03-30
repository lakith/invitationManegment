import React,{Component} from 'react'
import NavBar from '../../components/NavBar/navBar';
import Footer from '../../components/Footer/footer';
import { Header, Grid, Segment,  Image, Icon, Container, Label, Sidebar, Menu } from 'semantic-ui-react';
import {connect} from 'react-redux'
import welcome from '../../assessts/welcome.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart,faUmbrellaBeach,faAnchor,faAtom,faBaby,faHeadset,faOutdent } from '@fortawesome/free-solid-svg-icons'
import MyEventBody from './MyEventBody/MyEventBody';
import * as eventActions from '../../store/index'

class Myevents extends Component {
    
    state={
        visible: false,
        isPaid : null,
        isPast : null,
        eventTypeId : 0,
        component:null

    }

    componentDidMount(){
        console.log(this.props.accessToken);
        this.props.OnMyEventDefault(this.props.accessToken);
    }

    handleShowClick = () => this.setState({ visible: true })
    handleSidebarHide = () => this.setState({ visible: false })


    setSelected = (type,value)=>{
        if(type==="peyment"){
            if(value==="free"){

                // this.setState({
                //     isPaid : "free",
                //     isPast : null,
                //     eventTypeId : 0,
                // })
                
                this.props.OnMyEventFree(this.props.accessToken,this.props.eventData);

            } else if(value ==="paid"){

                // this.setState({
                //     isPaid : "paid",
                //     isPast : null,
                //     eventTypeId : 0
                // })

                this.props.OnMyEventPaid(this.props.accessToken,this.props.eventData);
                this.handleSidebarHide();

            }
        } else if(type === "time"){
            if(value==="old"){

                // this.setState({
                //     isPaid : null,
                //     isPast : "old",
                //     eventTypeId : 0
                // })

                this.props.OnMyEventOld(this.props.accessToken,this.props.eventData);
                this.handleSidebarHide();

            } else if(value==="new"){
                // this.setState({
                //     isPaid : null,
                //     isPast : "new",
                //     eventTypeId : 0,
                // })
                this.props.OnMyEventNew(this.props.accessToken,this.props.eventData);
                this.handleSidebarHide();
            }
        } else if(type === "event"){
            //    this.setState({
            //     isPaid : null,
            //     isPast : null,
            //     eventTypeId : value
            // })

            this.props.OnMyEventEventId(this.props.accessToken,value,this.props.eventData);
            this.handleSidebarHide();
        }
    }

    render(){
    
        const { visible } = this.state

        return(
            <div>
                <NavBar />
                <Container fluid style={{padding:0}}>
                <Image src={welcome} fluid />
                </Container>
                <div>
                    <Sidebar.Pushable as={Segment}>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={this.handleSidebarHide}
                        vertical
                        visible={visible}
                        width='thin'
                    >
                        <Menu.Item as='a' onClick={()=>this.setSelected("event",1)}>
                        <Icon name='birthday cake' />
                        Birthday
                        </Menu.Item>
                        <Menu.Item as='a' onClick={()=>this.setSelected("event",2)}>
                        <FontAwesomeIcon icon={faHandHoldingHeart} size="2x" />
                        <br />
                        <br />
                        Wedding
                        </Menu.Item>
                        <Menu.Item as='a' onClick={()=>this.setSelected("event",3)}>
                        <FontAwesomeIcon icon={faUmbrellaBeach} size="2x" />
                        <br />
                        <br />
                        Holiday Party
                        </Menu.Item>
                        <Menu.Item as='a' onClick={()=>this.setSelected("event",4)}>
                        <FontAwesomeIcon icon={faAnchor} size="2x" />
                        <br />
                        <br />
                        Corporate
                        </Menu.Item>
                        <Menu.Item as='a' onClick={()=>this.setSelected("event",5)}>
                        <FontAwesomeIcon icon={faBaby} size="2x" />
                        <br />
                        <br />
                        Baby Shower
                        </Menu.Item>
                        <Menu.Item as='a' onClick={()=>this.setSelected("event",6)}>
                        <FontAwesomeIcon icon={faAtom} size="2x" />
                        <br />
                        <br />
                        Baby Shower
                        </Menu.Item>
                        <Menu.Item as='a' onClick={()=>this.setSelected("event",7)}>
                        <FontAwesomeIcon icon={faHeadset} size="2x" />
                        <br />
                        <br />
                        Show or Performance
                        </Menu.Item>
                        <Menu.Item as='a' onClick={()=>this.setSelected("event",8)}>
                        <FontAwesomeIcon icon={faOutdent} size="2x" />
                        <br />
                        <br />
                        Other
                        </Menu.Item>
                        <Menu.Item as='a' onClick={()=>this.setSelected("peyment","free")}>
                        <Icon name='gg' />
                        Free Events
                        </Menu.Item>
                        <Menu.Item as='a' onClick={()=>this.setSelected("peyment","paid")}>
                        <Icon name='dollar sign' />
                        Paid Events
                        </Menu.Item>
                        <Menu.Item as='a'>
                        <Icon name='hacker news' onClick={()=>this.setSelected("time","new")} />
                        New Events
                        </Menu.Item>
                        <Menu.Item as='a' onClick={()=>this.setSelected("time","old")}>
                        <Icon name='ils' />
                        Closed Events
                        </Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher dimmed={visible}>
                        <Segment basic>
                        
                  
                <Header
                    as='h1'
                    content='Your events'  
                    textAlign='center'
                    style={{color:"#7E7B80"}}
                    />
                    <br/>
                    <center>
                        <div>
                            <Label as='a' tag>
                            New Events
                            </Label>
                            <Label as='a' color='red' tag>
                            Upcoming Events
                            </Label>
                            <Label as='a' color='teal' tag>
                            Featured Events
                            </Label>
                            <Label as='a' color='violet' disabled={visible} onClick={this.handleShowClick} tag>
                            Click Here To Filter
                            </Label>
                        </div>
                    </center>
                    <br/>
                    <Grid container columns={3} doubling stackable style={{marginBottom:"2%",marginTop:"2%"}}>
                       <MyEventBody 
                            accessToken = {this.props.accessToken}
                            myEventLoad = {this.props.myEventLoad}
                            myEventError = {this.props.myEventError}
                            eventData = {this.props.eventData}
                       />
                    </Grid>
                    </Segment>
                    </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        OnMyEventPaid : (token,currentData) => dispatch(eventActions.myEventPaid(token,currentData)),
        OnMyEventFree : (token,currentData) => dispatch(eventActions.myEventFree(token,currentData)),
        OnMyEventOld : (token,currentData) => dispatch(eventActions.myEventOld(token,currentData)),
        OnMyEventNew : (token,currentData) => dispatch(eventActions.myEventNew(token,currentData)),
        OnMyEventEventId : (token,eventTypeId,currentData) => dispatch(eventActions.myEventEventId(token,eventTypeId,currentData)),
        OnMyEventDefault : (token) => dispatch(eventActions.myEventDefault(token))
    }
}

const mapStateToProps = state => {
    return{
        accessToken: state.auth.accessToken,
        myEventLoad:state.myEvent.myEventLoad,
        myEventError:state.myEvent.myEventError,
        eventData:state.myEvent.myEventData
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Myevents);