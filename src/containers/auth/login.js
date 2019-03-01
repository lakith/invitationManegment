import React,{Component} from 'react';
import { Segment, Grid, Divider, Header, Icon, Form, Button, Message, Image, Reveal, Container} from 'semantic-ui-react';
import {NavLink,Redirect} from 'react-router-dom'
import * as actionTypes from '.././../store/index'
import {connect} from 'react-redux'
import NavBar from '../../components/NavBar/navBar';
import Footer from '../../components/Footer/footer';
import Logo from '../../assessts/rsvpster-logo (1).png'
import './login.css'
import Party from '../../assessts/party3.jpg'

class Login extends Component {

    state = {
        username:{
            value:"",
            touched:false
        },
        password:{
            value:"",
            touched:false
        },
        validationErrors: []
    }

    handleInputErrors = (inputName,errors) => {
        return errors.some(error=>
            error.message.toLowerCase().includes(inputName)
            ) ? "error" : ""
    }

    handleChange = (event)=>{
        if(event.target.name === "username"){
            let updatedUsername = {...this.state.username}
            updatedUsername.value = event.target.value
            this.setState({username:updatedUsername})

        } else if(event.target.name === "password") {
            let updatedPassword = {...this.state.password}
            updatedPassword.value = event.target.value
            this.setState({password:updatedPassword})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.username.value === ""){
            this.setState({validationErrors:this.state.validationErrors.concat({message:"Please Insert Your Username"})})
        } else if(this.state.password.value === ""){
            this.setState({validationErrors:this.state.validationErrors.concat({message:"Please Insert Your Password"})})
        }
        if(this.isFormValid()){
            this.props.onSubmit(this.state.username.value,this.state.password.value);
        }
        
    }

    isFormValid = () => this.state.username.value !== "" && this.state.password.value !== "";


    
    // displayErrors = errors => errors.map((error,index)=>(
    //     <p key={index}>{error.message}</p>
    // ));

    render(){

        let username = this.state.username.value;
        let password = this.state.password.value;

        let setRedirect = null
        if(this.props.isAuthenticated){
            setRedirect = <Redirect to="/" />
        }


        return(
            <div>
            <NavBar />
            <Segment placeholder style={{height:600,marginTop:-10,marginBottom:-2}}>
            {setRedirect} 
            <Grid columns={2} stackable textAlign='center'>
              <Divider vertical><Icon className="hidemobile" name="calendar" color="blue" /></Divider>
        
              <Grid.Row verticalAlign='middle'>
                <Grid.Column>
                    <Header as="h1" icon color="orange" textAlign="center">
                        <Icon name="code branch" color='violet' />
                            Login to <Image style={{width:160,margin:6}}  src={Logo}  />
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                    
                        <Segment stacked style={{height:280,paddingTop:"10%",backgroundImage:"url("+Party+")"}}>
                            {/* <div style={{marginBottom:10}}><Image className="inline" src={Hotel} size="small"/><Image className="inline" src={Food} size="small"/><Image className="inline" src={Licqure} size="tini"/></div> */}
                            <Form.Input style={{width:260,marginLeft:-25}} className={this.handleInputErrors('username',this.state.validationErrors)}  size="large" fluid name="username" icon="user circle" iconPosition="left" placeholder="Username" onChange={this.handleChange} type="text" value={username} required />
                            <Form.Input style={{width:260,marginLeft:-25}} className={this.handleInputErrors('password',this.state.validationErrors)}  size="large" fluid name="password" icon="lock" iconPosition="left" placeholder="Password" onChange={this.handleChange} type="password" value={password} required />
                            <Button   disabled={this.props.loading} className={this.props.loading? 'loading':''} color="violet" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    {this.state.validationErrors.length > 0? (<Message error><h3>Error</h3>{this.displayErrors(this.state.validationErrors)}</Message>):null} 
                    {this.state.errors ? (<Message error><h3>Error</h3>{this.props.errors}</Message>):null} 
                    <Message>Don't have an account ?  <NavLink to="/register">Signup</NavLink></Message>
                </Grid.Column>
        
                <Grid.Column>
                    <Container className="hidemobile" >
                        <div style={{padding:10,margin:"auto",display:"block",paddingLeft:'35%'}}>
                            <Reveal animated='rotate'>
                                <Reveal.Content visible>
                                <Image circular size='small' src='https://react.semantic-ui.com/images/wireframe/square-image.png' />
                                </Reveal.Content>
                                <Reveal.Content hidden>
                                <Image circular size='small' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />
                                </Reveal.Content>
                            </Reveal>
                        </div>
                        <div style={{padding:10,margin:"auto",display:"block",paddingLeft:'35%'}}>
                            <Reveal animated='rotate'>
                                <Reveal.Content visible>
                                <Image circular size='small' src='https://react.semantic-ui.com/images/wireframe/square-image.png' />
                                </Reveal.Content>
                                <Reveal.Content hidden>
                                <Image circular size='small' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />
                                </Reveal.Content>
                            </Reveal>
                        </div>
                        <div style={{padding:10,margin:"auto",display:"block",paddingLeft:'35%'}}>
                            <Reveal animated='rotate'>
                                <Reveal.Content visible>
                                <Image circular size='small' src='https://react.semantic-ui.com/images/wireframe/square-image.png' />
                                </Reveal.Content>
                                <Reveal.Content hidden>
                                <Image circular size='small' src='https://react.semantic-ui.com/images/avatar/large/stevie.jpg' />
                                </Reveal.Content>
                            </Reveal>
                        </div>
                    </Container>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Footer />
          </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        isAuthenticated : state.auth.accessToken !== null,
        loading:state.auth.loading,
        errors:state.auth.errors
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        onSubmit : (username,password) => dispatch(actionTypes.authLogin(username,password))
    }
} 

export default connect(mapStateToProps,mapDispatchToProps) (Login)