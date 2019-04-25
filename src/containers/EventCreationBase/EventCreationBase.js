import React, { Component } from 'react'
import { Container, Grid, Header, Icon, Form, Button, Modal, Input } from 'semantic-ui-react';
import NavBar from '../../components/NavBar/navBar';
import Footer from '../../components/Footer/footer';
import './EventCrationBase.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import BBack from '../../assessts/birthday-background.jpg'
import mime from 'mime-types'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {connect} from 'react-redux'
import * as eventActions from '../../store/index'
import {Redirect} from 'react-router-dom'

class EventCreationBase extends Component {

    state={
       eventType:null, 
       eventHEading:"",
       errorEventHEading:false,
       eventPlace:"",
       errorEventPlace:false,
       eventStartDate:new Date(),
       eventEndDate:new Date(),
       eventHostedUrl:"",
       open: false,
       authorized : ['image/jpeg','image/png'],
       file:null,
       fileError:null
    }

    componentDidMount(){
        let param = new URLSearchParams(this.props.location.search);
        console.log(param.get("event"));
        this.setState({
            eventType:param.get("event")
        })
    }

    onFileAdd = (event) => {
        const file = event.target.files[0];
        if(file){
            if(this.isAuthorized(file.name)){
                this.setState({ file });
            } else {
                this.setState({
                    fileError:true
                })
            }
        }
    }

    isAuthorized = (filename) => {
        return this.state.authorized.includes(mime.lookup(filename))
     }

   
    handleStart = (date) => {
        console.log(date);
        this.setState({
            eventStartDate:date
        })
    }

    handleEnd = (date) => {
       // console.log(date);
        this.setState({
            eventEndDate:date
        })
    }

    handleChange = (event,type) =>{
        if(type === 1){
            this.setState({
                eventHEading:event.target.value
            })
        } else if (type===2){
            this.setState({
                eventPlace:event.target.value
            })
        } else if (type===3){
            this.setState({
                eventHostedUrl:event.target.value
            })
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        if(this.validateFields()){
            console.log("submit");
            this.closeConfigShow(false, false); 
        }

    }

    closeConfigShow = (closeOnEscape, closeOnDimmerClick) => {
        console.log("entred")
        this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
    }
    
    close = () => this.setState({ open: false })


    validateFields = () => {
        if(this.state.eventHEading === ""){
            this.setState({
                errorEventHEading:true
            })
            return false;
        } else if(this.state.errorEventPlace === ""){
            this.setState({
                errorEventPlace:true
            })
            return false;
        } else {
            return true;
        }
    }
    
    showError= () =>{
        NotificationManager.error('Error message', 'Invalied File Type', 2000);
    }

    postData = () => {

        this.close();
        let eventHostedUrl = this.state.eventHostedUrl;
        if(eventHostedUrl === ""){
            eventHostedUrl = null;
        }

        let eventData = {
            eventHeading:this.state.eventHEading,
            eventStartDate:this.state.eventStartDate,
            eventEndDate:this.state.eventEndDate,
            eventPlace:this.state.eventPlace,
            eventHostedUrl:eventHostedUrl,
            eventTypeId:this.state.eventType,
            thumbnail:this.state.file
        }
        console.log(this.props.accessToken)
        let token = "Bearer "+this.props.accessToken

        this.props.onFileUpload(eventData,token);
    }

    render(){

        const { open, closeOnEscape, closeOnDimmerClick,fileError } = this.state

        let upload = null;
        if(fileError){
            upload = fileError;
        }

        let fieldClassHeading = "lblPadding";
        if(this.state.errorEventHEading){
            fieldClassHeading = "lblPadding error"
        }

        let fieldClassPlace = "lblPadding";
        if(this.state.errorEventHEading){
            fieldClassPlace = "lblPadding error"
        }

        let ridirect = null
        if(this.props.eventSuccess){
            ridirect =  <Redirect to="/my-events" />
        }

        return(
            <React.Fragment>
                <NavBar />
                        <div>
                        {ridirect}
                        <Modal
                            open={open}
                            closeOnEscape={closeOnEscape}
                            closeOnDimmerClick={closeOnDimmerClick}
                            onClose={this.close}
                            style={{width:"60%",height:"32%",marginTop:"20%",marginLeft:"20%"}}
                            >
                            {upload?this.showError():null}
                            <Modal.Header>Please upload the event front image thumbnail.</Modal.Header>
                            <Modal.Content>
                            <Input 
                                    fluid
                                    label="File types: jpg, png"
                                    name="file"
                                    type="file"
                                    onChange={this.onFileAdd}
                                />
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={this.close} negative>
                                No
                                </Button>
                                <Button
                                onClick={this.postData}
                                positive
                                labelPosition='right'
                                icon='checkmark'
                                content='Yes'
                                />
                            </Modal.Actions>
                            <NotificationContainer/>
                            </Modal>
                        </div>
                        <Grid columns={2} stackable>
                        <Grid.Column className="hidemobile" width={10} style={{height:750}}>
                            <Container style={{backgroundImage:"url("+BBack+")",height:750}} >
                            <div style={{bottom:0,position:"absolute",paddingBottom:'2%',float:"right"}}>
                                <Button circular color='facebook' icon='facebook' />
                                <Button circular color='twitter' icon='twitter' />
                                <Button circular color='linkedin' icon='linkedin' />
                                <Button circular color='google plus' icon='google plus' />
                            </div>
                            </Container>
                        </Grid.Column>
                        <Grid.Column width={6}>
                        <div className="desPostition">
                            <Header as='h2' style={{paddingBottom:"5%"}}>
                                <Icon name='star half outline' />
                                <Header.Content>
                                    Event Details 
                                <Header.Subheader>Provide our Event Basic details</Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Container style={{paddingBottom:"10%"}}>
                            <Form size="large" onSubmit={this.handleSubmit}>
                                <Form.Input className={fieldClassHeading} label="Event heading"  size="medium" fluid name="heading" onChange={(event)=>this.handleChange(event,1)} value={this.state.eventHEading}  placeholder="Event heading" type="text"  required />
                                <Form.Input className={fieldClassPlace} label="Event place" size="medium" fluid name="place" onChange={(event)=>this.handleChange(event,2)} value={this.state.eventPlace} placeholder="Event place" type="text" required />
                                <div className="required" style={{paddingBottom:"2%"}}>
                                <label style={{paddingBottom:"2%"}} >Start Date</label>
                                <br />
                                <DatePicker
                                    // selected={this.state.startDate}
                                    placeholderText="Event Start date and time"
                                    selected={this.state.eventStartDate}
                                    onChange={this.handleStart}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    timeCaption="time"
                                    className="inputWidth"
                                />
                                </div>
                                <div className="required" style={{paddingBottom:"4%"}}>
                                <label style={{paddingBottom:"2%"}} >End Date</label>
                                <br/>
                                    <DatePicker
                                        // selected={this.state.startDate}
                                        selected={this.state.eventEndDate}
                                        placeholderText="Event end date and time"
                                        onChange={this.handleEnd}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        timeCaption="time"
                                        className="inputWidth"
                                        required
                                    />
                                </div>
                                <label  style={{paddingBottom:"2%"}} ><strong>Event Hosted url</strong></label>
                                <Form.Input size="medium"  onChange={(event)=>this.handleChange(event,3)} value={this.state.eventHostedUrl}  fluid name="hosted"  placeholder="Event Hosted url" type="text" />
                                <Button loading={this.props.eventLoad} color='violet' fluid><strong>Submit your event data</strong></Button>
                            </Form>
                            </Container>
                        </div>
                        {/* </div>
                        </div>
                        </div> */}
                        </Grid.Column>
                        </Grid>
                <Footer />
            </React.Fragment>
        )
    }

}
const mapStateToProps = state => {
    return{
        accessToken: state.auth.accessToken,
        eventErrors: state.event.eventErrors,
        eventLoad: state.event.eventLoad,
        eventSuccess: state.event.eventSuccess
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFileUpload :(eventData,token) => dispatch(eventActions.eventSubmit(eventData,token))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(EventCreationBase);