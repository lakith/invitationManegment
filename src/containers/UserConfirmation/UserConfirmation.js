import React, { Component } from "react";
import { Grid, Form, Radio, Button, Segment, Header, Icon } from "semantic-ui-react";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import axios from '../../axios-base'
import NavBar from "../../components/NavBar/navBar";
import Footer from "../../components/Footer/footer";

class UserConfirmation extends Component {

    state = {
        radioValueAttandance : 1,
        radioValueMealPreferance : 1,
        type: null,
        eventId : 0,
        loading:false,
        redirect : false
    }

      componentDidMount () {
        let param = new URLSearchParams(this.props.location.search);
        console.log(param.get("event-id"));
        this.setState({
            eventId:param.get("event-id"),
            type:param.get("type")
        })
      }
      
      handleChangeAtandance = (e, { value }) => {
        let choice = this.state.radioValueAttandance === 1 ? 0 : 1
        this.setState({
          radioValueAttandance : choice
          
        })
      }
      
      handleChangeMeal = (e, { value }) => {
        let choice = this.state.radioValueMealPreferance === 1 ? 0 : 1
        this.setState({
          radioValueMealPreferance : choice
        })
      }

      submitData = (event) => {
        event.preventDefault();

        this.setState({
            loading:true
        })

        let submitData = {
            eventId: this.state.eventId , 
            mealPreference : this.state.radioValueMealPreferance,
            confirmation : this.state.radioValueAttandance
        }

        if(this.state.type === "general"){
            axios({
                method:'post',
                url:'/general-guest/confirm-user',
                data:submitData,
                headers: {
                    Authorization: 'Bearer ' + this.props.accessToken
                  }
    
            }).then((response) => {
                NotificationManager.success('Success message', 'Registerd to the event Successfully');
                this.setState({
                    loading:false,
                    redirect:true
                })
            }).catch((err)=>{
                NotificationManager.error('Error message', 'Something Went Wrong');
                this.setState({
                    loading:false
                })
            })
        } else if(this.state.type === "special") {
            axios({
                method:'post',
                url:'/special-guest/confirm-user',
                data:submitData,
                headers: {
                    Authorization: 'Bearer ' + this.props.accessToken
                  }
            }).then((response) => {
                NotificationManager.success('Success message', 'Registerd to the event Successfully');
                this.setState({
                    loading:false,
                    redirect:true
                })
            }).catch((err)=>{
                NotificationManager.error('Error message', 'Something Went Wrong');
                this.setState({
                    loading:false
                })
            })
        }

        
      }

  render() {
    const { radioValueAttandance,radioValueMealPreferance } = this.state

    let setRedirect = null;
    if(!this.props.isAuthenticated){
       setRedirect =  <Redirect to="/login"/>
    }

    if(this.state.redirect){
        setRedirect = <Redirect to="/"/>
    }

    return (
    <React.Fragment>
        <NavBar />
      <Grid columns={3} style={{paddingTop:20,paddingBottom:20}}>
        {setRedirect}
        <Grid.Column computer={3} tablet={2} mobile={1}></Grid.Column>
        <Grid.Column computer={10} tablet={12} mobile={12}>
        <Segment fluid>
        <Header as='h2' icon textAlign='center' style={{paddingTop:20,paddingBottom:20}}>
        <Icon name='users' circular />
        <Header.Content>Confirm Your Attandence</Header.Content>
        </Header>
        <Form onSubmit={this.submitData}>
        <Form.Field
                  toggle
                  control={Radio}
                  label='Not-Comming &nbsp; :  &nbsp;  Comming &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;  Attandance Confirmation '
                  value={1}
                  checked={radioValueAttandance === 1}
                  onChange={this.handleChangeAtandance}
                  required
                />
          <br/>
          <Form.Field
                  toggle
                  control={Radio}
                  label='Non-Veg : Veg  &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;  Meal Preferance'
                  value={1}
                  checked={radioValueMealPreferance === 1}
                  onChange={this.handleChangeMeal}
                  required
                />
        <center><Button color='teal'>Submit your choice</Button></center>
        </Form>
        </Segment>
        </Grid.Column>
        <Grid.Column computer={3} tablet={2} mobile={1}></Grid.Column>
        <NotificationContainer />
      </Grid>
      <Footer/>
      </React.Fragment>
    );
  }
}

let mapStateToProps = (state) => {
    return {
        isAuthenticated : state.auth.accessToken !== null,
        accessToken : state.auth.accessToken
    }
}

export default connect(mapStateToProps)(UserConfirmation);
