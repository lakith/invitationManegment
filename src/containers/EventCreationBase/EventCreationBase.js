import React, { Component } from 'react'
import { Container, Grid, Segment, Header, Icon, Form } from 'semantic-ui-react';
import NavBar from '../../components/NavBar/navBar';
import Footer from '../../components/Footer/footer';
import './EventCrationBase.css'

class EventCreationBase extends Component {

    render(){
        return(
            <React.Fragment>
                <NavBar />
                {/* <Grid>
                    <Grid.Row columns={2} container>
                    <Grid.Column computer={10} mobile={8} tablet={8}>
                            <Segment>Content</Segment>
                        </Grid.Column>
                        <Grid.Column computer={6} mobile={8} tablet={8} style={{height:1000}}>
                        <div style={{position:"absolute",display: "table-cell", top:"50%",verticalAlign: "middle",border:"1px solid black"}}>
                            <Header as='h2'>
                                <Icon name='star half outline' />
                                <Header.Content>
                                    Event Details 
                                <Header.Subheader>Provide our Event Basic details</Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Container>
                            <Form size="large" onSubmit={this.handleSubmit}>
                                <Form.Input  size="medium" fluid name="heading" icon="user circle" iconPosition="left" placeholder="Event heading" type="text"  required />
                                <Form.Input  size="medium" fluid name="place" icon="lock" iconPosition="left" placeholder="Event place" type="text" required />
                                <Form.Input  size="medium" fluid name="hosted" icon="lock" iconPosition="left" placeholder="Event Hosted url" type="text" required />
                            </Form>
                            </Container>
                        </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid> */}

                        <Grid columns={2} stackable>
                        <Grid.Column className="hidemobile" width={10} style={{height:700}}>
                            <Segment>Content</Segment>
                        </Grid.Column>
                        <Grid.Column width={6}>
                        {/* <div style={{display: "table",height:500, position: "relative", overflow: "hidden"}}>
                        <div style={{position:"absolute", top: "50%" , display: "table-cell" ,  verticalAlign:"middle"}}>
                        <div style={{position:"relative", top: "-50%"}}> */}
                        <div className="desPostition">
                            <Header as='h2' style={{paddingBottom:"5%"}}>
                                <Icon name='star half outline' />
                                <Header.Content>
                                    Event Details 
                                <Header.Subheader>Provide our Event Basic details</Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Container>
                            <Form size="large" onSubmit={this.handleSubmit}>
                                <Form.Input label="Event heading"  size="medium" fluid name="heading" icon="user circle" iconPosition="left" placeholder="Event heading" type="text"  required />
                                <Form.Input label="Event place" size="medium" fluid name="place" icon="lock" iconPosition="left" placeholder="Event place" type="text" required />
                                <label><strong>Event Hosted url</strong></label>
                                <Form.Input size="medium" fluid name="hosted" icon="lock" iconPosition="left" placeholder="Event Hosted url" type="text" required />
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

export default EventCreationBase;