import React,{Component} from 'react'
import NavBar from '../../components/NavBar/navBar';
import Footer from '../../components/Footer/footer';
import { Header, Grid, Segment, Card, Image, Icon, Container, Label, Button, Sidebar, Menu } from 'semantic-ui-react';
import axios from '../../axios-base';
import {connect} from 'react-redux'
import welcome from '../../assessts/welcome.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart,faUmbrellaBeach,faAnchor,faAtom,faBaby,faHeadset,faOutdent } from '@fortawesome/free-solid-svg-icons'
import MyEventBody from './MyEventBody/MyEventBody';

class Myevents extends Component {
    
    state={
        // events:null,
        // load:false,
        // error:null,
        visible: false,
        isPaid : null,
        isPast : null,
        eventTypeId : 0
    }

    // componentDidMount(){

    // }

    handleShowClick = () => this.setState({ visible: true })
    handleSidebarHide = () => this.setState({ visible: false })

    // componentDidUpdate(){
    //     let propsRedux = {...this.props}
    //     let token = propsRedux.accessToken;

    //     console.log(token);

    //     axios({
    //         method:'get',
    //         url:'staffUser/my-events',
    //         headers: {
    //             Authorization: 'Bearer ' + token
    //           }

    //     }).then((response) => {
    //         if(!this.state.events && this.state.events !==response.data){
    //             this.setState({events:response.data})
    //         }
    //         console.log(this.state.events);
    //     }).catch((err)=>{
    //         this.setState({error:err.response.data.message});
    //     })

    // }

    setSelected = (type,value)=>{
        if(type==="peyment"){
            if(value==="free"){
                this.setState({
                    isPaid : "free",
                    isPast : null,
                    eventTypeId : 0
                })
            } else if(value ==="paid"){
                this.setState({
                    isPaid : "paid",
                    isPast : null,
                    eventTypeId : 0
                })
            }
        } else if(type === "time"){
            if(value==="old"){
                this.setState({
                    isPaid : null,
                    isPast : "old",
                    eventTypeId : 0
                })
            } else if(value==="new"){
                this.setState({
                    isPaid : null,
                    isPast : "new",
                    eventTypeId : 0
                })
            }
        } else if(type === "event"){
            this.setState({
                isPaid : null,
                isPast : null,
                eventTypeId : value
            })
        }
    }

    render(){
    
        const { visible } = this.state

        // let events = null;
        // if(this.state.events){
        // events =  this.state.events.map(event=>(
        //     <Grid.Column>
        //         <Card fluid>
        //         <Image src={event.eventThumbnail} style={{height:220}} />
        //         <Card.Content>
        //         <Card.Header>{event.eventName}</Card.Header>
        //         <Card.Meta>
        //             <span className='date'>{event.startDate}</span>
        //         </Card.Meta>
        //         <Card.Description>
        //             <strong>Event Place &nbsp;</strong>{event.eventPlace}
        //             <br />
        //             <strong>Event Hosted Url &nbsp;</strong>{event.eventHostedUrl}
        //         </Card.Description>
        //         </Card.Content>
        //         <Card.Content extra>
                
        //         <a href>
        //             <Icon name='user' />
        //             {event.numberOfGuests} Guests
        //         </a>
        //         </Card.Content>
        //     </Card>
        // </Grid.Column>
        // ))
        // }

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
                        Tec-meetup
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
                            token={this.props.accessToken}
                            isPaid={this.state.isPaid}
                            isPast={this.state.isPast}
                            eventTypeId={this.state.eventTypeId}
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

const mapStateToProps = state => {
    return{
        accessToken: state.auth.accessToken
    }
}
export default connect(mapStateToProps)(Myevents);