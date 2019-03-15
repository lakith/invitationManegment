import React, { Component } from 'react'
import _ from 'lodash'
import { Grid, Segment, Header, Icon, Search, Label, List, Button, Dropdown, Container, Popup, Message } from 'semantic-ui-react';
import axios from '../../axios-base'
import './EventAdmins.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';


class EventAdmins extends Component{

    state = {
        admins:[],
        selectPreferance:null,
        dataset : [],
        isLoading: false,
        results: [],
        buttonLoading:false,
        submitError:null,
        value: '',
        noOFAdmins:0
    }
    componentDidMount(){

        console.log(this.props.match.params.id)

        this.setEventAdmins();

        axios.get("/staffUser/get-all-users")
            .then((response)=>{
                let users = [];
                let one = response.data.map(user => {
                        let newUser = {
                            userId:user.userId,
                            title:user.name,
                            description:user.email,
                            price:user.username,
                            image:user.profilePic
                        }
                        users.push(newUser);
                })
                console.log(one);
                this.setState({
                    dataset:users
                })
            })
            .catch((err)=>{
                console.log(err.response);
            })
    }

  setEventAdmins = () => {
    axios.get("/event-admins/get-all-admins?event-id="+this.props.match.params.id)
    .then(response => {
        let admins = [];
        let one = response.data.map(admin => {
            let newAdmin = {
                key: admin.userId,
                text: admin.name,
                value: admin.username,
                image: { avatar: true, src:admin.imageUrl}
            }

            admins.push(newAdmin)
        })

        let count = _.size(admins);

        this.setState({
            admins:admins,
            noOFAdmins:count
        })

        console.log(this.state.admins)
    })
    .catch(error => {
        console.log(error.response);
    })
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title,selectPreferance:result.userId })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.dataset, isMatch),
      })
    }, 300)
  }

  saveUser = (userId) => {

    let dataset = {
        eventId:this.props.match.params.id,
        adminUsers:[userId]
    }
    this.setState({
        buttonLoading:true,
        submitError:null
    })
    axios.post("/event-admins/save-admins",dataset)
        .then(response => {
            this.setState({
                buttonLoading:false,
                submitError:null
            })
            console.log(response);
            this.successRequest();

        })
        .catch((error)=>{
            this.setState({
                buttonLoading:false,
                submitError:error.response.message
            })
            this.failRequest();
            console.log(error.response);
        })
  }

  failRequest = () => {
        NotificationManager.error('Error message', 'Event Admin Adition failed', 3000);
  }

  successRequest = () => {
        this.setEventAdmins()
        NotificationManager.success('Success message', 'Admin Addedd Successfully', 3000);
  }

  segmentClose = () => {
      this.setState({
          selectPreferance:null
      })
  }

    render(){
        const { isLoading, value, results } = this.state

        let error = null;
        if(this.state.submitError){
            error = (
                <Message
                    style={{width:"94%"}}
                    error
                    header='Error Occured In The Admin Addtion'
                    list={[
                            'You must Provide A Valied User.',
                            'Check Your Internet Connection.',
                            this.state.submitError
                          ]}
                />
            )
        }


        let select = "";
        if(this.state.selectPreferance){
            let selectedData = _.find(this.state.dataset,(data) => data.userId === this.state.selectPreferance);
            select = (
                <Segment > 
                    <Icon  onClick={this.segmentClose} style={{float:"right"}} name='delete' /> 
                    <br />
                    <Label as='a' size="large" color="blue" image>
                        <img src={selectedData.image} alt="admin-user" />
                        {selectedData.title}
                    </Label>
                    <List>
                        <List.Item icon='user' content={selectedData.price} />
                        <List.Item
                        icon='mail'
                        content={<a href={'mailto:'+selectedData.description}>{selectedData.description}</a>}
                        />
                        <List.Item icon='linkify' content={<a href='http://www.semantic-ui.com'>semantic-ui.com</a>} />
                    </List>
                    <Button.Group loading={this.state.buttonLoading}>
                        <Button icon="close" onClick={this.segmentClose} negative>Cansel User</Button>
                        <Button.Or />
                        <Popup
                            trigger={<Button  color='green' icon='save' content='Save User' />}
                            content={<Button icon="warning circle" onClick={()=>this.saveUser(selectedData.userId)} color='orange' content='Confirm your Choice' />}
                            on='click'
                            position='top right'
                        />
                    </Button.Group>
                </Segment>
            )
        }

        return(
                          
               <Grid columns={2} stackable>
                <Grid.Column width="12" style={{paddingRight:0}} >
                    <Grid columns={3} stackable>
                        <Grid.Column width="5" style={{paddingRight:0}}>
                            <Segment inverted color='teal'>
                                <Header as='h2' icon textAlign='center'>
                                    <Icon name='adn' circular />
                                    <Header.Content>
                                        Event Admins
                                    <Header.Subheader>
                                        Manage your Event Admins<br />
                                        <span>Admins - {this.state.noOFAdmins}</span>
                                    </Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Segment>
                        </Grid.Column >
                        <Grid.Column width="5" style={{paddingRight:0}}>
                            <Segment inverted color='pink'>
                                <Header as='h2' icon textAlign='center'>
                                    <Icon name='user circle' circular />
                                    <Header.Content>
                                        Special Guests
                                    <Header.Subheader>
                                        Manage your Special Guests<br />
                                        <span>Special Guests - 20</span>
                                    </Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width="5" style={{paddingRight:0}}>
                            <Segment inverted color='brown'>

                            <Header as='h2' icon textAlign='center'>
                                    <Icon name='user outline' circular />
                                    <Header.Content>
                                        Genaral Guests
                                    <Header.Subheader>
                                        Manage your genaral Guests<br />
                                        <span>Guests - 20</span>
                                    </Header.Subheader>
                                    </Header.Content>
                            </Header>

                            </Segment>
                        </Grid.Column>
                    </Grid>
                    <Grid columns={1} stackable>
                    <Grid.Column width="6" style={{paddingRight:0}}>
                        <Grid columns={2} stackable >
                        <Grid.Column width="7" style={{paddingRight:0}}>
                        <Label size="large"  as='a' style={{marginTop:"2%"}}>
                            Add Event Admins
                        </Label>
                        </Grid.Column>
                        <Grid.Column width="9" style={{paddingRight:0}}>
                        <Search
                            className="widthIncrese"
                            loading={isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                            results={results}
                            value={value}
                            {...this.props}
                        />
                         </Grid.Column>
                        </Grid>
                        {select? select:null}
                    </Grid.Column>
                    <Grid.Column width="10" >
                        <Container style={{paddingLeft:"6%"}}>
                        <Dropdown
                            style={{width:"94%"}}
                            placeholder='Check Your Event Admins ...'
                            fluid
                            selection
                            options={this.state.admins}
                        />

                        {error?error:null}
                            
                        </Container>
                    </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width="4" style={{paddingRight:0,marginLeft:"-1.5%"}}>
                    <Segment>bla</Segment>
                </Grid.Column>
                <NotificationContainer/>
               </Grid>
               
            

        )
    }   
}

export default EventAdmins;