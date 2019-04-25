import React ,{Component} from 'react'
import NavBar from '../../components/NavBar/navBar';
import Footer from '../../components/Footer/footer';
import { Grid, Segment, Image, Container, Statistic, Button, Icon, Modal, Header } from 'semantic-ui-react';
import Event from '../../assessts/events.jpg'
import Baby from '../../assessts/baby-shower.jpg'
import Birthday from '../../assessts/birthday.jpg'
import Coporate from '../../assessts/coporate.jpg'
import Holiday from '../../assessts/holiday.jpg'
import Wedding from '../../assessts/wedding.jpg'
import Other from '../../assessts/other.jpg'
import Show from '../../assessts/show.jpg'
import Tech from '../../assessts/tech.jpg'
import "./EventCreationMain.css"
import {NotificationContainer, NotificationManager} from 'react-notifications';

class EventCreationMain extends Component {

    state = { 
        open: false,
        choice:null,
        isOpen: false
     }

    show = dimmer => () => this.setState({ dimmer, open: true })
    close = () => this.setState({ open: false })

    setSelectedChoice = (choice)=>{
        this.setState({choice:choice})
    }

    passParams = () => {

        if(!this.state.choice){
            NotificationManager.error('Error message', 'You must select an option to continue', 3000);
        } else {
            let quaryParam = encodeURIComponent("event") + '=' + encodeURIComponent(this.state.choice);
            this.props.history.push({
                pathname:'/event-base',
                search: '?' + quaryParam
            }) 
        }
    }

    render(){

        const { open, dimmer,choice } = this.state;

        let selected = null;
        if(choice === 1){
            selected = "Birthday"
        } else if(choice === 2){
            selected = "Wedding"
        } else if(choice === 3 ){
            selected = "Holiday party"
        } else if(choice === 4 ){
            selected = "Coporate"
        } else if(choice === 5 ){
            selected = "Baby Shower"
        } else if(choice === 6){
            selected = "Tec-meetup"
        } else if(choice === 7){
            selected = "Show Or Performance"
        } else if(choice === 8){
            selected = "Other"
        }




        return(
            <div>
                
                <div >
                        <Modal dimmer={dimmer} open={open} onClose={this.close} style={{width:"70%",marginLeft:"15%",height:"90%",marginTop:"2%"}}>
                            <Modal.Header>Select Your Event Type</Modal.Header>
                            <Modal.Content image scrolling>
                                <Modal.Description>
                                <Header>Event Types</Header>
                                <div style={{marginLeft:"2%"}}>
                                <Button onClick={()=>this.setSelectedChoice(1)} animated='vertical' basic color='violet' content='Violet' style={{margin:"1%"}}>
                                <Button.Content hidden><Header as='h4' color='violet'>Birthday</Header></Button.Content>
                                <Button.Content visible style={{padding:0}}>
                                    <img alt="birthday" style={{margin:"auto"}} src={Birthday} />
                                </Button.Content>
                                </Button>

                                <Button onClick={()=>this.setSelectedChoice(2)} animated='vertical' basic color='violet' content='Violet' style={{margin:"1%"}}>
                                <Button.Content hidden><Header as='h4' color='violet'>Wedding</Header></Button.Content>
                                <Button.Content visible style={{padding:0}}>
                                    <img alt="wedding" style={{margin:"auto"}} src={Wedding} />
                                </Button.Content>
                                </Button>

                                <Button onClick={()=>this.setSelectedChoice(3)} animated='vertical' basic color='violet' content='Violet' style={{margin:"1%"}}>
                                <Button.Content hidden><Header as='h4' color='violet'>Holiday Party</Header></Button.Content>
                                <Button.Content visible style={{padding:0}}>
                                    <img alt="party" style={{margin:"auto"}} src={Holiday} />
                                </Button.Content>
                                </Button>

                                <Button onClick={()=>this.setSelectedChoice(4)} animated='vertical' basic color='violet' content='Violet' style={{margin:"1%"}}>
                                <Button.Content hidden><Header as='h4' color='violet'>Coporate</Header></Button.Content>
                                <Button.Content visible style={{padding:0}}>
                                    <img alt="coporate" style={{margin:"auto"}} src={Coporate} />
                                </Button.Content>
                                </Button>
                                </div>
                                
                                <div style={{marginLeft:"2%"}}>
                                <Button onClick={()=>this.setSelectedChoice(5)} animated='vertical' basic color='violet' content='Violet' style={{margin:"1%"}}>
                                <Button.Content hidden><Header as='h4' color='violet'>Baby Shower</Header></Button.Content>
                                <Button.Content visible style={{padding:0}}>
                                    <img alt="baby-shower" style={{margin:"auto"}} src={Baby} />
                                </Button.Content>
                                </Button>

                                <Button onClick={()=>this.setSelectedChoice(6)} animated='vertical' basic color='violet' content='Violet' style={{margin:"1%"}}>
                                <Button.Content hidden><Header as='h4' color='violet'>Tec-meetups</Header></Button.Content>
                                <Button.Content visible style={{padding:0}}>
                                    <img alt="tech" style={{margin:"auto"}} src={Tech} />
                                </Button.Content>
                                </Button>

                                <Button onClick={()=>this.setSelectedChoice(7)} animated='vertical' basic color='violet' content='Violet' style={{margin:"1%"}}>
                                <Button.Content hidden><Header as='h4' color='violet'>Show or Performance</Header></Button.Content>
                                <Button.Content visible style={{padding:0}}>
                                    <img alt="show-or-performance" style={{margin:"auto"}} src={Show} />
                                </Button.Content>
                                </Button>

                                <Button onClick={()=>this.setSelectedChoice(8)} animated='vertical' basic color='violet' content='Violet' style={{margin:"1%"}}>
                                <Button.Content hidden><Header as='h4' color='violet'>Other</Header></Button.Content>
                                <Button.Content visible style={{padding:0}}>
                                    <img alt="other" style={{margin:"auto"}} src={Other} />
                                </Button.Content>
                                </Button>
                                </div>
                                
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <span style={{float:"left",marginTop:"2%",marginLeft:"2%"}}>Selected Choice : {selected}</span> 
                                <Button color='black' onClick={this.close}>
                                Cansel
                                </Button>
                                <Button
                                style={{marginRight:"8%"}}
                                color="violet"
                                icon='checkmark'
                                labelPosition='right'
                                content="Select event"
                                onClick={this.passParams}
                                // onClick={this.close}
                                />
                            </Modal.Actions>
                            <NotificationContainer/>
                        </Modal>
                        
                </div>
                
                <NavBar />
                <Container fluid style={{padding:0,paddingBottom:"1%"}}>
                    <Grid>
                       <center> <Grid.Column className="mobileEventFix" computer={16} mobile={15} tablet={15}>
                            <Segment  style={{padding:0}}>
                                <Image src={Event} />
                            </Segment>
                        </Grid.Column></center>
                        <Grid.Row columns={2} style={{padding:0}}>
                            <Grid.Column computer={10} mobile={15} tablet={12} style={{paddingBottom:"2%",paddingTop:"2%",paddingLeft:"4%"}}>
                                <div style={{backgroundColor:"#FDFDFD"}}>
                                <Image.Group size='small'>
                                    <Image  src={Baby} />
                                    <Image src={Coporate} />
                                    <Image src={Birthday} />
                                    <Image src={Holiday} />
                                    <Image src={Wedding} />
                                </Image.Group>
                                </div>
                            </Grid.Column>
                            <Grid.Column computer={6} mobile={15} tablet={4} style={{paddingBottom:"4%",paddingTop:"4.5%"}}>
                                <Grid>
                                        <Grid.Column computer={8} mobile={15} tablet={4} >
                                        <center><div className="mobileMarginFix" style={{paddingBottom:"5%",paddingLeft:"12%"}}>
                                            <Statistic.Group>
                                                    <Statistic>
                                                        <Statistic.Value>22</Statistic.Value>
                                                        <Statistic.Label>Events</Statistic.Label>
                                                    </Statistic>

                                                    <Statistic>
                                                        <Statistic.Value>22</Statistic.Value>
                                                        <Statistic.Label>Members</Statistic.Label>
                                                    </Statistic>
                                                </Statistic.Group>
                                            </div></center>
                                        </Grid.Column>
                                        <Grid.Column computer={8} mobile={15} style={{paddingTop:"3%"}} >
                                            <center><div className="mobileMarginFix" style={{margin:"auto"}}>    
                                            <Button className="mobileMarginFix" style={{marginTop:10,marginBottom:10}} onClick={this.show('blurring')} icon color='purple'>
                                                <Icon name='glass martini' />
                                                &nbsp; Create Your Event &nbsp;
                                            </Button>
                                            </div></center>
                                        </Grid.Column>
                                    
                                </Grid>     
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
                <Footer />
            </div>
        )
    }
}

export default EventCreationMain;