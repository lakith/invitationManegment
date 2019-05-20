import React, { Component } from 'react'
import _ from 'lodash'
import { Grid, Segment, Header, Icon,  Label, List, Button, Message, Menu, Input, Form } from 'semantic-ui-react';
import axios from '../../axios-base'
import '../EventAdmins/EventAdmins.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';


class FilterUsers extends Component{

    state = {
        admins:[],
        selectPreferance:null,
        dataset : [],
        isLoading: false,
        results: [],
        buttonLoading:false,
        submitError:null,
        value: '',
        noOFAdmins:0,
        activeItem: 'home',
        inputValue:"",
        userList:[]
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

  viewUsers = () => {
    axios("/report-view/report?eventId="+this.props.match.params.id, {
        method: 'GET',
        responseType: 'blob' //Force to receive data in a Blob Format
    }).then(response => {
        //Create a Blob from the PDF Stream
            const file = new Blob(
              [response.data], 
              {type: 'application/pdf'});
        //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
            window.open(fileURL);
        })
        .catch(error => {
            console.log(error);
        });
  }

  addNewInvitations = (event) => {
    event.preventDefault();
    this.setState({
        userList : this.state.userList.concat(this.state.inputValue),
        inputValue:""
    })

  }

  inputChange = (event) => {
      this.setState({
            inputValue:event.target.value
      })
  }

     handleItemClick = (e, { name }) => this.setState({ activeItem: name })

     render(){

        const { activeItem } = this.state

        return(
            <React.Fragment>          
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
                </Grid.Column>
            </Grid>
            <Grid>
                <Grid.Column>
                    <Segment basic>
                        <Label as='a' basic color='blue'>Check Existing User Requests</Label>
                        &nbsp; &nbsp; &nbsp; &nbsp;<Button size="tiny" color="violet" onClick={this.viewUsers}>User Requests</Button>
                    </Segment>
                </Grid.Column>
            </Grid>

            <Grid columns={3}>
                <Grid.Column width={7} style={{paddingLeft:"2.8%"}} >
                    <Form onSubmit={this.addNewInvitations}>
                        <Form.Group>
                            <Input type="email" value={this.state.inputValue} onChange={this.inputChange} style={{width:"73%"}} placeholder='Add More Invitatios...' required />
                            <Button content='Add User' style={{marginLeft:"4%"}} color="violet" />
                        </Form.Group>
                    </Form>
                </Grid.Column>
                <Grid.Column width={5} style={{paddingRight:"4%"}}>
                <Menu fluid vertical >
                    {this.state.userList.length ? this.state.userList.map((user)=>(
                        <Menu.Item>{user}</Menu.Item>
                    )) : (<Menu.Item name='Add Users....' />) }
                </Menu>
                <Button color="violet" floated="right">Submit Users</Button>
                </Grid.Column>
                <Grid.Column width="4" >

                </Grid.Column>
            </Grid>   
        </React.Fragment>

            
        )
    }   
}

export default FilterUsers;