import React, { Component } from 'react'
import background from '../../assessts/backgroundView.jpg'
import { Grid, Segment, Container, Image, Header, Icon, Button,  GridColumn, Label, Comment, Form } from 'semantic-ui-react';
import NavBar from '../../components/NavBar/navBar';
import Footer from '../../components/Footer/footer';
import {connect} from 'react-redux';
import "./EventView.css"
import AddToCalendar from 'react-add-to-calendar';
import axios from '../../axios-base'
import ReactHtmlParser from 'react-html-parser'; 
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
  import {NotificationContainer, NotificationManager} from 'react-notifications';

class EventViewOriginal extends Component{

    state={
        eventData:null,
        loading:false,
        error:false,
        commentData: [],
        currentComment:"",
        commentSuccess:false,
        commentError:false,
        commentLoad:false
    }


    componentDidMount(){
        let param = new URLSearchParams(this.props.location.search);
        axios.get("event/get-one-event-display?event-id="+param.get("event"))
        .then(response=>{
            let eventData = response.data;
            let commentData = [];
            if(eventData.eventComments){
                commentData = [...eventData.eventComments]
                if(commentData && commentData.length){
                    commentData = [...eventData.eventComments]
                } else {
                    commentData = null;
                }
            }

            this.setState({
                eventData:response.data,loading:false,error:false,commentData:commentData
            })
        })
        .catch(error=>{
            console.log(error.response)
            this.setState({
                eventData:null,loading:false,error:true
            })
        })     
    }

    addComment = (event)=>{
            event.preventDefault();
            let param = new URLSearchParams(this.props.location.search);
            let eventData = {
                eventId:param.get("event"),
                comment:this.state.currentComment
            }
            let commentAdd = null;
            if(this.props.accessToken && this.state.currentComment !== ""){
                this.setState({commentLoad:true,commentError:false,commentSuccess:false});
                axios({
                    method:'post',
                    url:'/event-comments',
                    data:eventData,
                    headers: {
                        Authorization: 'Bearer ' + this.props.accessToken,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }

                }).then((response) => {

                    if(this.props.userData){
                        commentAdd = {
                            eventCommentId : Math.floor(Math.random() * 100),
                            comment:this.state.currentComment,
                            commenterName:this.props.userData.name,
                            commenterProfile:this.props.userData.profileUrl
                        }
                    }
                    let allComments = [...this.state.commentData]
                    allComments = allComments.concat(commentAdd);
                    this.setState({commentLoad:false,commentError:false,commentSuccess:true,commentData:allComments});
                }).catch((err)=>{
                    this.setState({commentLoad:false,commentError:true,commentSuccess:false});
                })
        }   
    }
    
    commentChange = (event) => {
        this.setState({
            currentComment:event.target.value
        })
    }

    buyTickets = () => {
        if(this.state.eventData.closed) {
            NotificationManager.error("Event Closed", "You cant buy tickets for this event",3000);
        }
        else {
            let quaryParam = encodeURIComponent("event-id") + '=' + encodeURIComponent(this.state.eventData.eventId);
            this.props.history.push({
                pathname:'/ticket-view',
                search: '?' + quaryParam
            }) 
        }
    }


    render(){

        let eventData = {...this.state.eventData}

        let shareUrl=eventData.eventName
        let title="RSVP STER Events"
        let exampleImage = eventData.eventThumbnail;
        let icon = { 'calendar-plus-o': 'left' };
        let event = {
            title: eventData.eventName ,
            description: 'This event is hosted in RSVP STER',
            location: eventData.eventPlace,
            startTime: eventData.eventStartDate,
            endTime: eventData.eventEndDate
        };

        let currentDate = new Date(eventData.eventStartDate);
        let months =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let startMonth = months[currentDate.getMonth()];
        let startYear = currentDate.getFullYear();
        let startDate = currentDate.getDate();
        let startHour = currentDate.getHours();
        let startMinutes = currentDate.getMinutes();

        let currentPassDate = new Date(eventData.eventEndDate)
        let endMonth = months[currentPassDate.getMonth()];
        let endYear = currentPassDate.getFullYear();
        let endDate = currentPassDate.getDate();
        let endHour = currentPassDate.getHours();
        let endMinutes = currentPassDate.getMinutes();

        // let commentData = [];
        // if(eventData.eventComments){
        // commentData = [...eventData.eventComments]
        //     if(commentData && commentData.length){
        //         commentData = [...eventData.eventComments]
        //     } else {
        //         commentData = null;
        //     }
        // }



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
                        <Container fluid style={{padding:0}}><Image fluid src={eventData.topImage?eventData.topImage:null} /></Container>
                    </Grid.Column>
                    <Grid.Column style={{backgroundColor:"#F0EFEF"}} computer={6} mobile={16} tablet={7}>
                        <Container>
                            <h3 style={{fontFamily:"'Raleway', 'sans-serif'",color:"#858484",fontWeight:300}}>{startMonth?startMonth:null} <br/>{startDate?startDate:null}</h3>
                            <div style={{marginTop:"20%",paddingBottom:0}}><strong><Header as="h3" style={{fontFamily:"'Raleway', 'sans-serif'",fontWeight:"bold"}} >{eventData.eventName?eventData.eventName:null}</Header></strong>
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
                            <Button fluid onClick={this.buyTickets}  color="violet" style={{float:"right",marginTop:"-0.6%"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Buy Tickets&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
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
                            {eventData.discription?ReactHtmlParser(eventData.discription):null}
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
                            Mon, {startMonth?startMonth:null} {startDate?startDate:null}, {startYear?startYear:null}, {startHour?startHour:null}:{startMinutes?startMinutes:null} –<br/>
                            Tue, {endMonth?endMonth:null} {endDate?endDate:null}, {endYear?endYear:null}, {endHour?endHour:null}:{endMinutes?endMinutes:null} MDT.
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
                                    url={"https://burger-builder-db22d.firebaseapp.com/"}
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
                            {this.state.commentData? this.state.commentData.map(comment => (
                                                        <Comment key={comment.eventCommentId}>
                                                        <Comment.Avatar as='a' src={comment.commenterProfile} />
                                                        <Comment.Content>
                                                            <Comment.Author>{comment.commenterName}</Comment.Author>
                                                            <Comment.Metadata>
                                                            <div>{Math.floor(Math.random() * 100)} days ago</div>
                                                            </Comment.Metadata>
                                                            <Comment.Text>{comment.comment}</Comment.Text>
                                                            <Comment.Actions>
                                                            <Comment.Action>Reply</Comment.Action>
                                                            </Comment.Actions>
                                                        </Comment.Content>
                                                        </Comment>
                                )) : null}

                            <Form onSubmit={this.addComment} reply>
                            <Form.TextArea value={this.state.currentComment} onChange={this.commentChange} required />
                            <Button loading={this.state.commentLoad} content='Add Comment' labelPosition='left' icon='edit' floated="right" primary />
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
            <NotificationContainer />
            <Footer />
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => ({
    userData: state.auth.userData,
    accessToken :state.auth.accessToken
});

export default connect(mapStateToProps)(EventViewOriginal);