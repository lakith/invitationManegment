import React,{Component} from 'react'
import { Button, Checkbox, Form,Dropdown,Radio, Grid, Segment, Header, Icon, TextArea, Popup, Message, Modal } from 'semantic-ui-react'
import "./EventForm.css"

const options = [
  { key: 'text', text: 'text', value: 'text' },
  { key: 'number', text: 'number', value: 'number' },
  { key: 'email', text: 'email', value: 'email' },
  { key: 'textarea', text: 'textarea', value: 'textarea' },
]

class EventForm extends Component {
  
  state = {
    radioValue : null,
    elementName: "",
    dropDownValue : "",
    elementTypeVal : "input",
    placeHolderVal : "",
    errorMessage : "",
    inputElements:[],
    displayError : false,
    submitState : null,
    buttonColor:null,
    options2: [],
    modalOpen: false

  }

  show = dimmer => () => this.setState({ dimmer, open: true })

  close = () => this.setState({ open: false })

  handleChange = (e, { value }) => this.setState({ radioValue:value });

  handleDropDownChange = (e, { value }) => this.setState({ dropDownValue:value });

  placeHolderChangeHandler = (event) => {
    this.setState({placeHolderVal:event.target.value});
  }

  errorMessageHandler = (event) => {
    this.setState({errorMessage:event.target.value});
  }

  elementNameHandler = (event) => {
      this.setState({elementName:event.target.value})
  }

  onElementSubmit = (event) => {
    event.preventDefault();
    this.setState({submitState:true});
  }

  onSubmitState = () => {
      this.setState({submitState:false})
  }

  errorDisplay = () => {
      this.setState({displayError : !this.state.displayError})
  }

  onConfirmChoice = () => {
    let redVal = 0
    if(this.state.radioValue){
        if(this.state.radioValue === "1"){
            redVal = 1
        } else if(this.state.radioValue === "2"){
            redVal = 2
        }
    }

    let element = {
        elementName:this.state.elementName,
        elementType:this.state.elementTypeVal,
        elementConfigType:this.state.dropDownValue,
        placeHolderText:this.state.placeHolderVal,
        required : redVal,
        errorMessage:this.state.errorMessage,
        radio:false,
        radioGroup:0
    }
    let elements = [];
    elements = [...this.state.inputElements]

    elements = elements.concat(element);

    
    let optionsList = [...this.state.options2];

    let newOption = {
        key: element.elementName,
        text: element.elementName,
        value: element.elementName 
    }
    
    optionsList = optionsList.concat(newOption);

    this.setState({inputElements:elements,options2:optionsList,submitState:null,elementName:"",dropDownValue:"",placeHolderVal:"",errorMessage:"",errorDisplay:false});
  }

  render () {
    const { radioValue,dropDownValue,errorMessage,placeHolderVal,elementName,open, dimmer } = this.state

    let buttonColor = null
    if(this.state.displayError){
        buttonColor = "orange"
    }

    

    let displaySeg = (
        <Segment placeholder>
            <Header icon>
            <Icon name='file code' />
                No Elements To display.
            </Header>
            <Button primary>Add New Elements</Button>
        </Segment>
    )

    if(this.state.submitState){
        displaySeg = (
        <Segment fluid>
            <Header size='medium'>Element Settings</Header>
            <Form>
                <Form.Field>
                    {/* <label>{this.state.elementName}</label>
                    <input placeholder={this.state.placeHolderVal} type={this.state.elementTypeVal} required /> */}
                    <Form.Input fluid label={this.state.elementName} type={this.state.dropDownValue} placeholder={this.state.placeHolderVal} readOnly required= {this.state.radioValue === "1" ? true:false}/>
                </Form.Field>
                <Button compact color={buttonColor} onClick={this.errorDisplay}>Error message</Button><br />
                {this.state.displayError?<Message negative>
                        <Message.Header>Error Message</Message.Header>
                        <p>{this.state.errorMessage}</p>
                </Message>:<br />}
                <div>
                    <Popup
                        trigger={<Button primary content='Save' />}
                        content={<Button color='yellow' content='Confirm your choice' onClick={this.onConfirmChoice} />}
                        on='click'
                        position='top left'
                    />
                    <Button secondary onClick={this.onSubmitState}>Clean</Button>
                </div>
            </Form>
        </Segment>
        )
        if(this.state.dropDownValue === "textarea"){
            displaySeg = (
            <Segment fluid>
                <Header size='medium'>Element Settings</Header>
                <Form>
                    <Form.Field>
                        <label>{this.state.elementName}</label>
                        <TextArea  placeholder={this.state.placeHolderVal} style={{ minHeight: 60 }} readOnly required= {this.state.radioValue === "1" ? true:false} />
                    </Form.Field>
                    <Button compact color={buttonColor} onClick={this.errorDisplay}>Error message</Button><br />
                {this.state.displayError?<Message negative>
                        <Message.Header>Error Message</Message.Header>
                        <p>{this.state.errorMessage}</p>
                </Message>:<br />}
                <div>
                    <Popup
                        trigger={<Button primary content='Save' />}
                        content={<Button color='yellow' content='Confirm your choice' onClick={this.onConfirmChoice} />}
                        on='click'
                        position='top left'
                    />
                    <Button secondary onClick={this.onSubmitState}>Clean</Button>
                </div>
                </Form>
            </Segment>
            )
        }
    }

    let displayElements = (
        <Segment placeholder>
        <Header icon>
        <Icon name='file code' />
            No Elements To display.
        </Header>
        <Button primary>Add New Elements</Button>
    </Segment>
    );
    if(this.state.inputElements && this.state.inputElements.length){
        displayElements = (
        <Segment>
                    <center><Header as='h2' style={{paddingBottom:"3%"}}>
                        <Icon name='settings' />
                        <Header.Content>
                        Event Form Settings
                        <Header.Subheader>Manage your preferences</Header.Subheader>
                        </Header.Content>
                    </Header></center>
            <Form>
                {
                    this.state.inputElements.map(element => (
                        <React.Fragment>
                            {element.elementConfigType === "textarea"?
                            <Form.Field>
                                <label>{element.elementName}</label>
                                <TextArea  placeholder={element.placeHolderText} style={{ minHeight: 60 }}  required= {element.required === "1" ? true:false} />
                            </Form.Field>
                            :
                            <Form.Field>
                                <Form.Input fluid label={element.elementName} type={element.elementConfigType} placeholder={element.placeHolderText} required={element.required}/> 
                            </Form.Field>}
                        </React.Fragment>
                    ))
                }
                  <Button.Group fluid>
                        <Button style={{paddng:2}}  content='Submit' primary />
                        <Button style={{paddng:2}}  content='Cancel' secondary />
                  </Button.Group>
            </Form>
        </Segment>
        )
    }

    return (
        <Grid columns={2} stackable >
        <Modal className="modalStyle" style={{width:"55%",height:"90%",clear:"both"}} dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Form Design</Modal.Header>
          <Modal.Content scrolling>
            <Modal.Description>
              <Header>Your creativity and our tecnology makes perfect designs.</Header>
              {displayElements}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Nope
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Yep, that's correct"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
        <Grid.Column width="12" style={{paddingRight:0}} >
            <Grid columns={2} stackable >
                <Grid.Column width="10" style={{paddingRight:0}} >
                    <Segment>
                        <Form onSubmit={this.onElementSubmit}>
                        <Header as='h2' >
                            <center><Icon name='plug' />
                            <Header.Content size = "small">Design Your Event Form</Header.Content></center>
                        </Header>
                            <Form.Field>
                            <label>Element Name</label>
                            <input placeholder='Element Name' onChange={this.elementNameHandler} value={elementName} required />
                            </Form.Field>
                            <Form.Field>
                            <Form.Input fluid label='Element Type' placeholder='Input' readOnly  required/>
                            </Form.Field>
                            <Form.Field>
                            <label>Element Config Type</label>
                            <Dropdown placeholder='Config Type' value={dropDownValue} onChange={this.handleDropDownChange} fluid search selection options={options} required />
                            </Form.Field>
                            <Form.Field>
                            <label>Place Holder Text</label>
                            <input placeholder='Place holder text' onChange={this.placeHolderChangeHandler} value={placeHolderVal} required />
                            </Form.Field>
                            <Form.Field>
                            <label>Error Message</label>
                            <input placeholder='Error Message' onChange={this.errorMessageHandler} value={errorMessage} required/>
                            </Form.Field>
                                    <Form.Group inline required>
                                <label>Required</label>
                                <Form.Field
                                    control={Radio}
                                    label='True'
                                    value="1" 
                                    checked={radioValue === '1'}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='False'
                                    value='2'
                                    checked={radioValue === '2'}
                                    onChange={this.handleChange}
                                />
                                </Form.Group>
                                <Form.Field>
                                <Checkbox label='I agree to the Terms and Conditions' />
                                </Form.Field>
                                <Button type='submit' onClick={this.onElementSubmit}>Submit</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
                <Grid.Column width="6" >
                    {displaySeg}
                    <Segment>
                        <Header size='medium'>Check Your Element Settings</Header>
                        <Dropdown placeholder='State' search selection options={this.state.options2} />
                    </Segment>
                    <Segment>
                        <Header size='medium'>View Your Current Form</Header>
                        <Button onClick={this.show('blurring')} color='violet' fluid>View Your Form Design</Button>
                    </Segment>
                </Grid.Column>
            </Grid>
        </Grid.Column>
        <Grid.Column width="4" >
            <Segment fluid></Segment>
        </Grid.Column>
  </Grid>
  )
}
  
}

export default EventForm;