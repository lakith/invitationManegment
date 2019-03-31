import React, { Component } from 'react'
import background from '../../assessts/backgroundView.jpg'
import { Grid, Segment, Container, Image, Header, Icon, Button, Divider, GridColumn, Label, Comment, Form } from 'semantic-ui-react';
import NavBar from '../../components/NavBar/navBar';
import Footer from '../../components/Footer/footer';
import sampleImage from '../../assessts/sampleImageRemove.jpg'
import "./EventView.css"
import AddToCalendar from 'react-add-to-calendar';
import {
    FacebookShareCount,
    GooglePlusShareCount,
    LinkedinShareCount,
    PinterestShareCount,
    VKShareCount,
    OKShareCount,
    RedditShareCount,
    TumblrShareCount,
  
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
    VKShareButton,
    OKShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    RedditShareButton,
    EmailShareButton,
    TumblrShareButton,
    LivejournalShareButton,
    MailruShareButton,
    ViberShareButton,
    WorkplaceShareButton,
    LineShareButton,
    WeiboShareButton,
  
    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
    LinkedinIcon,
    PinterestIcon,
    VKIcon,
    OKIcon,
    TelegramIcon,
    WhatsappIcon,
    RedditIcon,
    TumblrIcon,
    MailruIcon,
    EmailIcon,
    LivejournalIcon,
    ViberIcon,
    WorkplaceIcon,
    LineIcon,
  } from 'react-share';

  import {Link} from 'react-router-dom'

class EventView extends Component{

    render(){

        let shareUrl="https://burger-builder-db22d.firebaseapp.com"
        let title="burger"
        let exampleImage = sampleImage;
        let icon = { 'calendar-plus-o': 'left' };
        let event = {
            title: 'Sample Event',
            description: 'This is the sample event provided as an example only',
            location: 'Portland, OR',
            startTime: '2016-09-16T20:15:00-04:00',
            endTime: '2016-09-16T21:45:00-04:00'
        };

        return(
            <React.Fragment>
            <NavBar />
            <Grid columns={3} style={{backgroundImage:"url("+background+")",backgroundRepeat:"repeat-x"}}>
                <Grid.Column width={1} >
                </Grid.Column>
                <Grid.Column width={14} style={{marginTop:"5%",marginBottom:"5%"}}>
                    <Segment >
                    <Grid columns={2}>
                    <Grid.Column style={{padding:0}} computer={10} mobile={16} tablet={9}>
                        <Container fluid style={{padding:0}}><Image fluid src={sampleImage} /></Container>
                    </Grid.Column>
                    <Grid.Column style={{backgroundColor:"#F0EFEF"}} computer={6} mobile={16} tablet={7}>
                        <Container>
                            <h3 style={{fontFamily:"'Raleway', 'sans-serif'",color:"#858484",fontWeight:300}}>APR <br/>01</h3>
                            <div style={{marginTop:"20%",paddingBottom:0}}><strong><Header as="h3" style={{fontFamily:"'Raleway', 'sans-serif'",fontWeight:"bold"}} >Steve ‘n’ Seagulls at the Vail Ale House</Header></strong>
                            <h3 style={{fontFamily:"'Raleway', 'sans-serif'",color:"#858484",fontWeight:300,padding:0}}><em>by Vail Ale House</em></h3>
                            </div>
                            <h4 className="hideevent" style={{fontFamily:"'Raleway', 'sans-serif'",position:"absolute",color:"#858484",fontWeight:300,paddingBottom:"6%",bottom:0}}>$15</h4>
                        </Container>
                    </Grid.Column>
                    </Grid>
                    <Grid columns={2} style={{}}>
                        <Grid.Column style={{paddingBottom:0}}  computer={12} tablet={12} mobile={16}>
                        <Container className="eventView" >
                            <Icon  name="upload" link color="olive" size="large" /> &nbsp;&nbsp;&nbsp; <Icon name="like" color="red" link size="large"  /> 
                        </Container>
                        </Grid.Column>
                        <GridColumn style={{paddingBottom:0}}  computer={4} tablet={4} mobile={16} >
                            <Button fluid  color="violet" style={{float:"right",marginTop:"-0.6%"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Buy Tickets&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                        </GridColumn>
                    </Grid>
                    <Grid columns={1} style={{padding:0}}>
                        <GridColumn style={{padding:0}} width={16}>
                            <hr style={{border:"0.5px solid #D8D7D7"}} />
                        </GridColumn>
                    </Grid>

                    <Grid columns={2} >
                        <Grid.Column computer={10} tablet={9} mobile={16} >
                            <Container style={{paddingTop:"5%"}} >
                            <Header>Description</Header><br/>
                            Vail Ale House is proud and excited to announce that we will be hosting Steve ‘n Seagulls all the way from Finland with Clusterpluck as our opening act.
                            </Container>
                            <Container style={{paddingTop:"10%"}}>
                            <Header style={{fontFamily:"'Open Sans', 'sans-serif'",color:"#655E5E",fontWeight:300}} >Tags</Header>
                            <div>
                                <Label as='a' basic color='blue'>
                                    Party
                                </Label>
                                <Label as='a' basic color='blue'>
                                    Music
                                </Label>
                                <Label as='a' basic color='blue'>
                                    Things To Do In, La
                                </Label>
                            </div> 
                            </Container>

                        </Grid.Column>
                        <Grid.Column computer={6} tablet={7} mobile={16}>
                            <Container style={{paddingTop:"10%",paddingBottom:"10%"}}>
                            <Header style={{fontFamily:"'Open Sans', 'sans-serif'",color:"#655E5E",fontWeight:300}} >Date And Time</Header> 
                            <div>
                            <h4 style={{fontFamily:"'Open Sans', 'sans-serif'",color:"#8A8787",fontWeight:300}} >
                            Mon, Apr 1, 2019, 9:00 PM –<br/>
                            Tue, Apr 2, 2019, 1:30 AM MDT.
                            </h4>
                            </div>

                            </Container>
                            <Container>
                            <Header style={{fontFamily:"'Open Sans', 'sans-serif'",color:"#655E5E",fontWeight:300}}>
                                Add This Event To You Calander 
                            </Header>
                            <div>
                            <Link to="#">
                            <AddToCalendar
                                className="calanderStyle"
                                event={event}
                            />
                            </Link>
                            </div>
                            </Container>
                            <Container style={{paddingTop:"10%",paddingBottom:"10%"}}>
                            <Header style={{fontFamily:"'Open Sans', 'sans-serif'",color:"#655E5E",fontWeight:300}}>  Location </Header>
                            <div> 
                                <h4 style={{fontFamily:"'Open Sans', 'sans-serif'",color:"#8A8787",fontWeight:300}}>  
                                    Vail Ale House, <br/>
                                    2161 North Frontage Road West<br/>
                                    Vail, CO 81657<br/>
                                    United States<br/>
                                </h4>
                            </div>
                            </Container>
                            <Container>
                            <Header style={{fontFamily:"'Open Sans', 'sans-serif'",color:"#655E5E",fontWeight:300}}>Refund Policy</Header>
                            <div> 
                                <h4 style={{fontFamily:"'Open Sans', 'sans-serif'",color:"#8A8787",fontWeight:300}}>
                                Refunds up to 7 days before event 
                                </h4>
                            </div>
                            </Container>
                        </Grid.Column>
                    </Grid>
                    <Grid columns = {1}>
                        <Grid.Column width={16} style={{paddingTop:"10%",paddingBottom:"6%"}}>
                        <center>
                        <div className="Demo__container">
                                <div className="Demo__some-network" >
                                <FacebookShareButton
                                    url={shareUrl}
                                    quote={title}
                                    className="Demo__some-network__share-button">
                                    <FacebookIcon
                                    size={32}
                                    round />
                                </FacebookShareButton>

                                <FacebookShareCount
                                    url={shareUrl}
                                    className="Demo__some-network__share-count">
                                    {count => count}
                                </FacebookShareCount>
                                </div>

                                <div className="Demo__some-network">
                                <TwitterShareButton
                                    url={shareUrl}
                                    title={title}
                                    className="Demo__some-network__share-button">
                                    <TwitterIcon
                                    size={32}
                                    round />
                                </TwitterShareButton>

                                <div className="Demo__some-network__share-count">
                                    &nbsp;
                                </div>
                                </div>

                                <div className="Demo__some-network">
                                <TelegramShareButton
                                    url={shareUrl}
                                    title={title}
                                    className="Demo__some-network__share-button">
                                    <TelegramIcon size={32} round />
                                </TelegramShareButton>

                                <div className="Demo__some-network__share-count">
                                    &nbsp;
                                </div>
                                </div>

                                <div className="Demo__some-network">
                                <WhatsappShareButton
                                    url={shareUrl}
                                    title={title}
                                    separator=":: "
                                    className="Demo__some-network__share-button">
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>

                                <div className="Demo__some-network__share-count">
                                    &nbsp;
                                </div>
                                </div>

                                <div className="Demo__some-network">
                                <GooglePlusShareButton
                                    url={shareUrl}
                                    className="Demo__some-network__share-button">
                                    <GooglePlusIcon
                                    size={32}
                                    round />
                                </GooglePlusShareButton>

                                <GooglePlusShareCount
                                    url={shareUrl}
                                    className="Demo__some-network__share-count">
                                    {count => count}
                                </GooglePlusShareCount>
                                </div>

                                <div className="Demo__some-network">
                                <LinkedinShareButton
                                    url={shareUrl}
                                    title={title}
                                    windowWidth={750}
                                    windowHeight={600}
                                    className="Demo__some-network__share-button">
                                    <LinkedinIcon
                                    size={32}
                                    round />
                                </LinkedinShareButton>

                                <LinkedinShareCount
                                    url={shareUrl}
                                    className="Demo__some-network__share-count">
                                    {count => count}
                                </LinkedinShareCount>
                                </div>

                                <div className="Demo__some-network">
                                <PinterestShareButton
                                    url={String(window.location)}
                                    media={`${String(window.location)}/${exampleImage}`}
                                    windowWidth={1000}
                                    windowHeight={730}
                                    className="Demo__some-network__share-button">
                                    <PinterestIcon size={32} round />
                                </PinterestShareButton>

                                <PinterestShareCount url={shareUrl}
                                    className="Demo__some-network__share-count" />
                                </div>

                                <div className="Demo__some-network">
                                <VKShareButton
                                    url={shareUrl}
                                    image={`${String(window.location)}/${exampleImage}`}
                                    windowWidth={660}
                                    windowHeight={460}
                                    className="Demo__some-network__share-button">
                                    <VKIcon
                                    size={32}
                                    round />
                                </VKShareButton>

                                <VKShareCount url={shareUrl}
                                    className="Demo__some-network__share-count" />
                                </div>

                                <div className="Demo__some-network">
                                <OKShareButton
                                    url={shareUrl}
                                    image={`${String(window.location)}/${exampleImage}`}
                                    windowWidth={660}
                                    windowHeight={460}
                                    className="Demo__some-network__share-button">
                                    <OKIcon
                                    size={32}
                                    round />
                                </OKShareButton>

                                <OKShareCount url={shareUrl}
                                    className="Demo__some-network__share-count" />
                                </div>

                                <div className="Demo__some-network">
                                <RedditShareButton
                                    url={shareUrl}
                                    title={title}
                                    windowWidth={660}
                                    windowHeight={460}
                                    className="Demo__some-network__share-button">
                                    <RedditIcon
                                    size={32}
                                    round />
                                </RedditShareButton>

                                <RedditShareCount url={shareUrl}
                                    className="Demo__some-network__share-count" />
                                </div>

                                <div className="Demo__some-network">
                                <TumblrShareButton
                                    url={shareUrl}
                                    title={title}
                                    windowWidth={660}
                                    windowHeight={460}
                                    className="Demo__some-network__share-button">
                                    <TumblrIcon
                                    size={32}
                                    round />
                                </TumblrShareButton>

                                <TumblrShareCount url={shareUrl}
                                    className="Demo__some-network__share-count" />
                                </div>

                                <div className="Demo__some-network">
                                <LivejournalShareButton
                                    url={shareUrl}
                                    title={title}
                                    description={shareUrl}
                                    className="Demo__some-network__share-button"
                                >
                                    <LivejournalIcon size={32} round />
                                </LivejournalShareButton>
                                </div>

                                <div className="Demo__some-network">
                                <MailruShareButton
                                    url={shareUrl}
                                    title={title}
                                    className="Demo__some-network__share-button">
                                    <MailruIcon
                                    size={32}
                                    round />
                                </MailruShareButton>
                                </div>

                                <div className="Demo__some-network">
                                <EmailShareButton
                                    url={shareUrl}
                                    subject={title}
                                    body="body"
                                    className="Demo__some-network__share-button">
                                    <EmailIcon
                                    size={32}
                                    round />
                                </EmailShareButton>
                                </div>
                                <div className="Demo__some-network">
                                <ViberShareButton
                                    url={shareUrl}
                                    title={title}
                                    body="body"
                                    className="Demo__some-network__share-button">
                                    <ViberIcon
                                    size={32}
                                    round />
                                </ViberShareButton>
                                </div>

                                <div className="Demo__some-network">
                                <WorkplaceShareButton
                                    url={shareUrl}
                                    quote={title}
                                    className="Demo__some-network__share-button">
                                    <WorkplaceIcon
                                    size={32}
                                    round />
                                </WorkplaceShareButton>
                                </div>

                                <div className="Demo__some-network">
                                <LineShareButton
                                    url={shareUrl}
                                    title={title}
                                    className="Demo__some-network__share-button">
                                    <LineIcon
                                    size={32}
                                    round />
                                </LineShareButton>
                                </div>

                                <div className="Demo__some-network">
                                <WeiboShareButton
                                    url={shareUrl}
                                    title={title}
                                    pic={`${String(window.location)}/${exampleImage}`}
                                    className="Demo__some-network__share-button">
                                    <img className="Demo__some-network__custom-icon" src="http://icons.iconarchive.com/icons/martz90/circle-addon2/512/weibo-icon.png" alt="Weibo share button" />
                                </WeiboShareButton>
                                </div>
                            </div>
                            </center>
                        </Grid.Column>
                    </Grid>
                    <Grid columns={2}>
                        <Grid.Column computer={10} tablet={9} mobile={16}>
                        <Comment.Group style={{fontFamily:"'Open Sans', 'sans-serif'"}} >
                            <Comment>
                            <Comment.Avatar as='a' src='https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png' />
                            <Comment.Content>
                                <Comment.Author>Joe Henderson</Comment.Author>
                                <Comment.Metadata>
                                <div>1 day ago</div>
                                </Comment.Metadata>
                                <Comment.Text>
                                <p>
                                    The hours, minutes and seconds stand as visible reminders that your effort put them all
                                    there.
                                </p>
                                <p>
                                    Preserve until your next run, when the watch lets you see how Impermanent your efforts
                                    are.
                                </p>
                                </Comment.Text>
                                <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                            </Comment>

                            <Comment>
                            <Comment.Avatar as='a' src='https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png' />
                            <Comment.Content>
                                <Comment.Author>Christian Rocha</Comment.Author>
                                <Comment.Metadata>
                                <div>2 days ago</div>
                                </Comment.Metadata>
                                <Comment.Text>I re-tweeted this.</Comment.Text>
                                <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                            </Comment>

                            <Form reply>
                            <Form.TextArea />
                            <Button content='Add Comment' labelPosition='left' icon='edit' floated="right" primary />
                            </Form>
                        </Comment.Group>
                        </Grid.Column>
                        <Grid.Column computer={6} tablet={7} mobile={16}>

                        </Grid.Column>
                    </Grid>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={1}>
                </Grid.Column>
            </Grid>
            <Footer />
            </React.Fragment>
        )
    }

}

export default EventView;