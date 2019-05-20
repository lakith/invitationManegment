import React, { Component } from 'react'
import { Grid, Card, Image, Button, List, Popup, Header } from 'semantic-ui-react';
import Silver from '../../assessts/silvercoin.jpg';
import Gold from '../../assessts/goldcoin.jpg';
import Platinum from '../../assessts/platinumcoin.jpg';
import Master from '../../assessts/master.png'
import Visa from '../../assessts/visa.png'
import Amarican from '../../assessts/amarican.png'
import Paypal from '../../assessts/peypal.jpg'

class Peyment extends Component {
    render() {
        return(
            <Grid columns={2}>
                <Grid.Column width={12}>
                    <Grid columns={3} style={{paddingLeft:"1%",paddingRight:"1%"}}>
                        <Grid.Column width={5}>
                            <Card fluid>
                            <Card.Content>
                                <Image floated='right' size='mini' src={Silver} />
                                <Card.Header>Silver Plan</Card.Header>
                                <Card.Meta>Friends of Elliot</Card.Meta>
                                <Card.Description>
                                    <List>
                                            <List.Item icon='users'>No Of Guests - <strong>100</strong></List.Item>
                                            <List.Item icon='users'>No Of Notifications - <strong>250</strong></List.Item>
                                            <List.Item icon='users'>No Of promotions - <strong>10</strong></List.Item>
                                            <div style={{paddingTop:"10%"}}><center><Header as="h4">Price - Rs 1200.00</Header></center></div>
                                    </List>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div>
                                    <center>
                                    <Button basic color='green'>
                                        View More Details
                                    </Button>
                                    </center>
                                </div>
                            </Card.Content>
                            </Card>
                            <div style={{paddingLeft:"12%"}} >
                            <Button color='violet'>
                                Choose Plan And Publish
                            </Button>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Card fluid>
                                <Card.Content>
                                    <Image floated='right' size='mini' src={Gold} />
                                    <Card.Header>Gold Plan</Card.Header>
                                    <Card.Meta>Basic Plan</Card.Meta>
                                    <Card.Description>
                                        <List>
                                            <List.Item icon='users'>No Of Guests - <strong>300</strong></List.Item>
                                            <List.Item icon='users'>No Of Notifications - <strong>550</strong></List.Item>
                                            <List.Item icon='users'>No Of promotions - <strong>15</strong></List.Item>
                                            <div style={{paddingTop:"10%"}}><center><Header as="h4">Price - Rs 2200.00</Header></center></div>
                                        </List>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                <div>
                                <center>
                                    <Button basic color='green'>
                                        View More Details
                                    </Button>
                                </center>
                                    </div>
                                
                                </Card.Content>
                                </Card>
                                <div style={{paddingLeft:"12%"}} >
                            <Button color='violet'>
                                Choose Plan And Publish
                            </Button>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Card fluid>
                                <Card.Content>
                                    <Image floated='right' size='mini' src={Platinum} />
                                    <Card.Header>Platinum Plan</Card.Header>
                                    <Card.Meta>Business Plan</Card.Meta>
                                    <Card.Description>
                                        <List>
                                            <List.Item icon='users'>No Of Guests - <strong>500</strong></List.Item>
                                            <List.Item icon='users'>No Of Notifications - <strong>800</strong></List.Item>
                                            <List.Item icon='users'>No Of promotions - <strong>20</strong></List.Item>
                                            <div style={{paddingTop:"10%"}}><center><Header as="h4">Price - Rs 3000.00</Header></center></div>
                                        </List>
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <div>
                                    <center>
                                    <Button basic color='green'>
                                        View More Details
                                    </Button>
                                    </center>
                                    </div>
                                </Card.Content>
                            </Card>
                            <div style={{paddingLeft:"12%"}} >
                            <Button color='violet'>
                                Choose Plan And Publish
                            </Button>
                            </div>
                        </Grid.Column>
                    </Grid>
                    <Grid columns={1} style={{marginTop:"7%"}}>
                        <Grid.Column >
                            <center>
                                <Popup trigger={<Button>View Peyment Plans In Brief</Button>} flowing hoverable>
                                    <Grid centered divided columns={3}>
                                    <Grid.Column textAlign='center'>
                                        <Header as='h4'>Starter Plan</Header>
                                        <p>
                                        <b>100</b>  guests, 1200 per event
                                        </p>
                                        <Button>Choose</Button>
                                    </Grid.Column>
                                    <Grid.Column textAlign='center'>
                                        <Header as='h4'>Basic Plan</Header>
                                        <p>
                                        <b>300</b>  guests, 2200 per event
                                        </p>
                                        <Button>Choose</Button>
                                    </Grid.Column>
                                    <Grid.Column textAlign='center'>
                                        <Header as='h4'>Platinum Plan</Header>
                                        <p>
                                        <b>600</b> guests, 3000 per event
                                        </p>
                                        <Button>Choose</Button>
                                    </Grid.Column>
                                    </Grid>
                                </Popup>
                            </center>
                        </Grid.Column>
                    </Grid>

                    <Grid style={{paddingTop:45}}>
                        <Grid.Column>
                        <div>
                            <center>
                                <Image.Group size='tiny'> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <Image style={{paddingLeft:"1%",paddingRight:"1%"}} src={Master} /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <Image style={{paddingLeft:"1%",paddingRight:"1%"}} src={Visa} /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <Image style={{paddingLeft:"1%",paddingRight:"1%"}} src={Amarican} /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <Image style={{paddingLeft:"1%",paddingRight:"1%"}} src={Paypal} /> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                </Image.Group>
                            </center>
                        </div>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={4}>
                    
                </Grid.Column>
            </Grid>
        )
    }
}

export default Peyment;