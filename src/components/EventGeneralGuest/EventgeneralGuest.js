import React,{Component} from 'react'
import { Grid, Form, Button, Segment, Menu, Header, Icon, Modal, Comment } from 'semantic-ui-react';
import axios from '../../axios-base'

class EventGeneralGuest extends Component {

    state = {
        guestName:"",
        guestEmail:"",
        guestList:[],
        currentGuestList:[],
        retriveErrorMessage : null
    };

    componentDidMount(){
        axios.get("general-guest/get-guests?event-id="+this.props.match.params.id)
        .then(response => {
            let guestList = [];

            let dump = response.data.map(user => {
                let struct = {
                    specialGuestId: user.genaralGuestId,
                    userId : user.genaralUser.userId,
                    name : user.genaralUser.name,
                    email : user.genaralUser.email,
                    profilePic : user.genaralUser.profilePic,
                    confirmation : user.confirmation,
                    mealPreferance : user.mealPreferance,
                    eventAdminConfirmation : user.eventAdminConfirmation
                }
                guestList = guestList.concat(struct);
                return true;
            })
            this.setState({currentGuestList:guestList});
        })
        .catch(error => {
            console.log(error.response.data);
            this.setState({retriveErrorMessage:error.response.data.message});
        })
    }

    
    show = dimmer => () => this.setState({ dimmer, open: true })

    close = () => this.setState({ open: false })

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    elementNameHandler = (event) => {
        this.setState({guestName:event.target.value});
    }

    elementEmailHandler = (event) => {
        this.setState({guestEmail:event.target.value});
    }

    addGuestsToList = (event) => {
        event.preventDefault();
        let guestList = [...this.state.guestList];
        let guest = {
            name:this.state.guestName,
            email:this.state.guestEmail
        };
        guestList = guestList.concat(guest);
        this.setState({guestList:guestList});
    }

    render(){
        const { activeItem,open, dimmer } = this.state;

        let modelContent = null;
        if(this.state.currentGuestList && this.state.currentGuestList.length){

            modelContent = (
                <React.Fragment>
                    {this.state.currentGuestList.map(guest => (
                         <Comment.Group>
                         <Comment>
                           <Comment.Avatar as='a' src={guest.profilePic} />
                           <Comment.Content>
                             <Comment.Author>{guest.name}</Comment.Author>
                             <Comment.Text>
                               {guest.email}
                             </Comment.Text>
                             <Comment.Actions>
                               <Comment.Action>{guest.confirmation}</Comment.Action>
                               <Comment.Action>{guest.mealPreferance}</Comment.Action>
                               <Comment.Action>{guest.eventAdminConfirmation?"confirmed":"pending"}</Comment.Action>
                               <Comment.Action>
                                 <Icon name='expand' />
                                 Full-screen
                               </Comment.Action>
                             </Comment.Actions>
                           </Comment.Content>
                         </Comment>
                       </Comment.Group>
                    ))}
              </React.Fragment>
            )
        }


        return(
            <Grid columns={2} stackable>
                <Modal className="modalStyle" style={{width:"55%",height:"90%",clear:"both"}} dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>General Guests</Modal.Header>
                    <Modal.Content scrolling>
                        <Modal.Description>
                        <Header>Event General Guests.</Header>
                            {modelContent}
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.close}>
                        Cansel
                        </Button>
                        <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content="Ok"
                        onClick={this.close}
                        />
                    </Modal.Actions>
                </Modal>
                <Grid.Column width={12}>
                <Grid columns={2} stackable>
                <Grid.Column width={8}>
                    <Segment>
                        <Form unstackable onSubmit={this.addGuestsToList}>
                            <Form.Input onChange={this.elementNameHandler} icon="user" iconPosition='left' label='Guest name' placeholder='Name' required />
                            <Form.Input type="email" onChange={this.elementEmailHandler} icon="at" iconPosition='left' label='Guest email' placeholder='Email' required />
                            <Form.Checkbox label='I agree to the Terms and Conditions' />
                            <Button type="submit" type='submit'>Add</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Menu vertical fluid>
                        <Menu.Item
                        name='header'
                        >
                        <Header as='h4'>Add Guests</Header>
                        <p>Add Guests to send invitations</p>
                        </Menu.Item>

                        {this.state.guestList.length ? this.state.guestList.map(one=>(
                            <React.Fragment>
                            <Menu.Item  name={one.name} active={activeItem === one.name} onClick={this.handleItemClick}>
                            {/* <Icon name="user close" /> */}
                            <Header as='h4'>
                            <Icon color="red" name="user close" iconPosition="right"></Icon>
                            {one.name}</Header>
                            <p>{one.email}</p>
                            </Menu.Item>
                            </React.Fragment>
                        )):null}
                    </Menu>
                    <Segment>
                        <Header size='medium'>Send your event invitations</Header>
                        <Button color='violet' fluid>Send invitations</Button>
                    </Segment>
                    <Segment>
                        <Header size='medium'>View your current reguler guests</Header>
                        <Button onClick={this.show('blurring')} color='violet' fluid>View Guests</Button>
                    </Segment>
                </Grid.Column>
                </Grid>
                </Grid.Column>
            </Grid>
        )
    }

}

export default EventGeneralGuest;