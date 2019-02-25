import React, { Component } from 'react';
import NavBar from '../../components/NavBar/navBar';
import Footer from '../../components/Footer/footer';
import { Grid, Segment, Reveal, Image } from 'semantic-ui-react';

class Home extends Component {
    render(){
        return(
            <div>
                <NavBar /> 
                 <Grid>
                     <Grid.Row columns={3}>
                        <Grid.Column computer={3} mobile={6} tablet={9}>
                            <Segment>Content</Segment>
                        </Grid.Column>
                        <Grid.Column computer={6} mobile={12} tablet={10}>
                            <Segment>Content</Segment>
                        </Grid.Column>
                        <Grid.Column computer={6} mobile={12} tablet={10}>
                            <Segment >Content</Segment>
                        </Grid.Column>    
                     </Grid.Row>
                     <Grid.Row columns={3}>
                        <Grid.Column computer={3} mobile={6} tablet={9}>
                            <Segment>Content</Segment>
                        </Grid.Column>
                        <Grid.Column computer={6} mobile={12} tablet={10}>
                            <Segment>Content</Segment>
                        </Grid.Column>
                        <Grid.Column computer={6} mobile={12} tablet={10}>
                            <Segment >Content</Segment>
                        </Grid.Column>    
                     </Grid.Row>
                     <Grid.Row columns={3}>
                        <Grid.Column computer={3} mobile={6} tablet={9}>
                            <Segment>Content</Segment>
                        </Grid.Column>
                        <Grid.Column computer={6} mobile={12} tablet={10}>
                            <Segment>Content</Segment>
                        </Grid.Column>
                        <Grid.Column computer={6} mobile={12} tablet={10}>
                            <Segment >Content</Segment>
                        </Grid.Column>    
                     </Grid.Row>
                     <Grid.Row columns={3}>
                        <Grid.Column computer={3} mobile={6} tablet={9}>
                            <Segment>Content</Segment>
                        </Grid.Column>
                        <Grid.Column computer={6} mobile={12} tablet={10}>
                            <Segment>Content</Segment>
                        </Grid.Column>
                        <Grid.Column computer={6} mobile={12} tablet={10}>
                            <Segment >Content</Segment>
                        </Grid.Column>    
                     </Grid.Row>
                     <Grid.Row columns={3}>
                        <Grid.Column computer={3} mobile={6} tablet={9}>
                            <Segment>Content</Segment>
                        </Grid.Column>
                        <Grid.Column computer={6} mobile={12} tablet={10}>
                            <Segment>Content</Segment>
                        </Grid.Column>
                        <Grid.Column computer={6} mobile={12} tablet={10}>
                            <Segment >Content</Segment>
                        </Grid.Column>    
                     </Grid.Row>
                     <Grid.Row columns={2}>
                        <Grid.Column computer={3} mobile={6} tablet={6}>
                            <Segment>Content</Segment>
                        </Grid.Column>
                        <Grid.Column computer={12} mobile={10} tablet={10}>
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
                        </Grid.Column>    
                     </Grid.Row>
                 </Grid>
                <Footer />
            </div>
        )
    }
}

export default Home;