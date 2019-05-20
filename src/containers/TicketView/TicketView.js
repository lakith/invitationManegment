import React, { Component } from "react";
import {
  Grid,
  Icon,
  Segment,
  Header,
  Form,
  TextArea,
  Button
} from "semantic-ui-react";
import Footer from "../../components/Footer/footer";
import NavBar from "../../components/NavBar/navBar";
import axios from "../../axios-base";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import _ from 'lodash'
import {Redirect} from 'react-router-dom'

class TicketView extends Component {
  state = {
    inputElements: [],
    eventId:0,
    invitationMail:"",
    redirect:false,
    loading:false
  };

  componentDidMount() {
    let param = new URLSearchParams(this.props.location.search);
    console.log(param.get("event-id"));

    axios
      .get("event-form?event-id=" + param.get("event-id"))
      .then(response => {
        let inputElements = [];

        response.data.formConfigs.map(element => {
          if (element.elementConfigType === "number") {
            let inputElement = {
              formConfigId: element.formConfigId,
              elementName: element.elementName,
              elementType: element.elementType,
              elementConfigType: element.elementConfigType,
              placeHolderText: element.placeHolderText,
              required: element.required,
              errorMessage: element.errorMessage,
              value: 0
            };
            inputElements.push(inputElement);
          } else {
            let inputElement = {
              formConfigId: element.formConfigId,
              elementName: element.elementName,
              elementType: element.elementType,
              elementConfigType: element.elementConfigType,
              placeHolderText: element.placeHolderText,
              required: element.required,
              errorMessage: element.errorMessage,
              value: ""
            };
            inputElements.push(inputElement);
          }
          return inputElements;
        });
        inputElements = _.orderBy(inputElements,['formConfigId'],["asc"]);
        this.setState({
            inputElements:inputElements,
            eventId: param.get("event-id")
        })
      })
      .catch(error => {
        NotificationManager.error('Error message', 'Some Thing went Wrong', 3000);
      });
  }

  onChangeValue = (event) => {
      let inputData = [...this.state.inputElements];
      
      let modifingObject = _.find(inputData, (o)=>{
          return o.elementName === event.target.name;
      })
      modifingObject.value = event.target.value;

      inputData = _.reject(inputData,(o)=> {
        return o.elementName === event.target.name;
      })

      inputData.push(modifingObject);

      inputData = _.orderBy(inputData,['formConfigId'],["asc"]);

      this.setState({
          inputElements:inputData
      })
  }

  mailChangeHandler = (event) => {
      this.setState({
          invitationMail : event.target.value
      })
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
        loading:true
    })

    let submitData  = {}  

    this.state.inputElements.map((element) => {
        let field = element.elementName;
        let value = element.value;
        submitData[field] = value
    })
    console.log(JSON.stringify(submitData));

    const formData = new FormData();
    formData.append("eventData",JSON.stringify(submitData));
    formData.append("eventId",this.state.eventId);
    formData.append("email",this.state.invitationMail);
    
    axios({
        method:'post',
        url:"event-form/save-event-data",
        data:formData
    }).then((response)=>{
        NotificationManager.success('Success message', 'Data Submitted successfully',2000);
        this.setState({
            loading:false,
            redirect:true
        })
    }).catch((error)=> {
        NotificationManager.error("Error Message","Something Went Wrong");
    })
}

    render() {
    let redirectSate = null
    if(this.state.redirect){
        redirectSate = (
            <Redirect to="/" />
        )
    }

    return (
      <React.Fragment>
        {redirectSate}
        <NavBar />
        <Grid column={3} style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Grid.Column computer={3} tablet={2} mobile={1} />
          <Grid.Column computer={10} tablet={12} mobile={12}>
            <Segment>
              <center>
                <Header as="h2" style={{ paddingBottom: "3%" }}>
                  <Icon name="settings" />
                  <Header.Content>
                    Event Form Details
                    <Header.Subheader>Manage your preferences</Header.Subheader>
                  </Header.Content>
                </Header>
              </center>
              <Form onSubmit={this.onSubmit}>
                {this.state.inputElements.map(element => (
                  <React.Fragment>
                    {element.elementConfigType === "textarea" ? (
                      <Form.Field key={element.formConfigId}>
                        <label>{element.elementName}</label>
                        <TextArea
                          placeholder={element.placeHolderText}
                          style={{ minHeight: 60 }}
                          value = {element.value}
                          required={element.required === "1" ? true : false}
                          name = {element.elementName}
                          onChange={this.onChangeValue}
                        />
                      </Form.Field>
                    ) : (
                      <Form.Field key={element.formConfigId}>
                        <Form.Input
                          fluid
                          label={element.elementName}
                          type={element.elementConfigType}
                          placeholder={element.placeHolderText}
                          value = {element.value}
                          required={element.required}
                          name = {element.elementName}
                          onChange={this.onChangeValue}
                        />
                      </Form.Field>
                    )}
                  </React.Fragment>
                ))}
                    <Form.Field >
                        <Form.Input
                          fluid
                          label={"Invitation Sending Email"}
                          type="email"
                          placeholder="Invitation sending mail"
                          value = {this.state.invitationMail}
                          required = {true}
                          name = {"Invitation Mail"}
                          onChange={this.mailChangeHandler}
                        />
                    </Form.Field>
                <Button.Group fluid>
                  <Button style={{ paddng: 2 }} loading={this.state.loading} content="Submit" primary />
                  <Button style={{ paddng: 2 }} content="Cancel" secondary />
                </Button.Group>
              </Form>
            </Segment>
          </Grid.Column>
          <Grid.Column computer={3} tablet={2} mobile={1} />
          <NotificationContainer />
        </Grid>
        <Footer />
      </React.Fragment>
    );
  }
}

export default TicketView;
