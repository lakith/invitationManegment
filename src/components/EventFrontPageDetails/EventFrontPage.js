import React,{Component} from 'react'
import ReactQuill, { Quill, Mixin, Toolbar ,Editor} from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import { Segment, Grid, Input, GridColumn, Label, Image, Header, Divider, List, Button, Form, Message, Portal } from 'semantic-ui-react';
import holi from '../../assessts/holi.jpg'
import mime from 'mime-types'
import axios from '../../axios-base'

const baseImage = '<p><img src="https://d2slcw3kip6qmk.cloudfront.net/marketing/blogs/press/0-CTA-GRAPHICS/Pick-A-Template_mint.png" /></p>'

class EventFrontPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
           text: baseImage,
           header:"",
           other:"",
           terms:"",
           file:"",
           fileError:false,
           authorized : ['image/jpeg','image/png'],
           displayError : false,
           submitSuccess : false,
           submitError : false,
           loading: false,
           open: false
         } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
      }


    
      handleClose = () => this.setState({ open: false })
      handleOpen = () => this.setState({ open: true })
    
      handleChange(value) {
        console.log(value)
        this.setState({ text: value })
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

    onHeadrChange = (event) => {
      this.setState({header:event.target.value})
    } 

    onOtherChange = (event) => {
      this.setState({other:event.target.value})
    } 

    onTermsChange = (event) => {
      this.setState({terms:event.target.value})
    }
    
    onSubmit = (event) => {
      console.log("enter");
      event.preventDefault();
      this.setState({
        loading:true,
        submitError:false,
        submitSuccess:false
      })
      if(this.onCheckState()){
        const formData = new FormData();
        formData.append("content",this.state.text);
        formData.append("termsAndConditions",this.state.terms);
        formData.append("otherDetails",this.state.other);
        formData.append("eventID",this.props.match.params.id)
        formData.append("frontImage",this.state.file);

        axios({
          method:'post',
          url:"event-front-page/save",
          data:formData,
          headers:{
              'content-Type': 'multipart/form-data',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          }
      }).then((response)=>{
          this.setState({
            loading:false,submitError:false,submitSuccess:true
          })
          this.handleOpen();
      }).catch((error)=> {
        this.setState({
          loading:false,submitError:true,submitSuccess:false
        })
      })

      } else {
        this.setState({displayError:true})
      }
    }

    onCheckState = () => {
      console.log("enter2");
      if(!this.state.header.length){
          return false;
      } else if(!this.state.other.length){
          return false;
      } else if(!this.state.terms.length){
          return false;
      } else if(!this.state.file){
          return false;
      } else if(this.state.fileError){
          return false;
      } else{
          return true;
      }
    }

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

    render(){

        const { open } = this.state

        let header = false;
        let other = false;
        let terms = false;
        let image = false;

        if(this.state.displayError) {
          if(!this.state.header.length){
              header =  true;
          } else if(!this.state.other.length){
              other =  true;
          } else if(!this.state.terms.length){
              terms =  true;
          } else if(!this.state.file){
              image =  true;
          } 
        }

        return(
            <Grid  columns={2} stackable >
                <Grid.Column width="12" style={{paddingRight:0}} >
                    <Segment>
                      <Portal onClose={this.handleClose} open={open}>
                          <Segment 
                            style={{
                              left: '40%',
                              position: 'fixed',
                              top: '50%',
                              backgroundColor:"#F4EAEA",
                              zIndex: 1000,
                            }}
                          >
                            <Header>{this.state.submitSuccess?"Your Data Saved Successfully":"Something Went Wrong"}</Header>
                            <p>{this.state.submitSuccess?"Your Event Data Saved Successfully":"Check Your Internet Connection or Check your Data"}</p>
                            <p>To close, simply click the close button or click away</p>
                            <Button
                              content='Close Portal'
                              color={this.state.submitSuccess?"green":"red"}
                              onClick={this.handleClose}
                            />
                          </Segment>
                        </Portal>
                      <Form onSubmit={this.onSubmit}>
                        <div>
                          <Label pointing='below' basic color="pink"  size="large">Event poster header.</Label>
                          <Input onChange={this.onHeadrChange} fluid label={{ icon: 'asterisk',color: 'pink' }} size='big' labelPosition='left corner' placeholder='Poster header...' value={this.state.header}/>
                          {header?(
                          <Message negative>
                            <Message.Header>Event Header Must not be Empty</Message.Header>
                          </Message>):null} 
                          <br />
                          </div>
                          <div>
                          <Label pointing='below' basic color="green" size="large">Event terms and conditions.</Label>
                          <Input onChange={this.onTermsChange} fluid label={{ icon: 'asterisk',color: 'green' }} size='big' labelPosition='left corner' placeholder='Terms and conditions...'  value={this.state.terms}/>
                          {terms?(
                          <Message negative>
                            <Message.Header>Event Terms Must not be Empty</Message.Header>
                          </Message>):null} 
                          <br />
                          </div>
                          <div>
                          <Label pointing='below' basic color="orange" size="large">Event other details.</Label>
                          <Input onChange={this.onOtherChange} fluid label={{ icon: 'asterisk',color: 'orange' }} size='big' labelPosition='left corner' placeholder='Other Details...' value={this.state.other} />
                          {other?(
                          <Message negative>
                            <Message.Header>Event Other Details Must not be Empty</Message.Header>
                          </Message>):null} 
                          <br />
                          </div>
                          <div>
                          <Label pointing='below' basic color="teal" size="large">Event Front Image.</Label>
                          <Input name="file" onChange={this.onFileAdd} fluid type="file" label={{ icon: 'asterisk',color: 'teal' }} size='big' labelPosition='left corner' />
                          {this.state.fileError?(
                          <Message negative>
                            <Message.Header>We're sorry your file type is invalied</Message.Header>
                            <p>Please upload a jpg or png image</p>
                          </Message>):null}
                          {image?(
                          <Message negative>
                            <Message.Header>Event Poster Image Must NOT be Empty</Message.Header>
                            <p>Please Upload an image</p>
                          </Message>):null}  
                          <br />
                          </div>
                          <div>
                          <Label pointing='below' basic  size="large">Event description content.</Label>
                          <ReactQuill 
                          theme={this.state.theme}
                          onChange={this.handleChange}
                          value={this.state.text}
                          modules={modules}
                          formats={formats}
                          bounds={'.app'}
                          placeholder={this.props.placeholder}
                          style={{height:"auto"}}
                          />
                          </div>
                          <br />
                          <Button type="submit" loading={this.state.loading} onClick={this.onSubmit} fluid color="pink">Publish Poster</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
                <Grid.Column width="4">
                    <Grid columns={2} stackable>
                        <GridColumn width="16">
                            <Segment>
                            <Header size='medium'>
                              Actions
                            </Header>
                            <Divider />
                            <List>
                            <List.Item>
                            <Label size='small' style={{marginBottom:"4px"}}>Status</Label><span style={{color:"#FF69B4"}}>&nbsp;&nbsp;Draft</span><br />
                            </List.Item>
                            <List.Item>
                            <Label size='small'style={{marginBottom:"4px"}}>Category</Label><span  style={{color:"#FF69B4"}} >&nbsp;&nbsp;Draft</span><br />
                            </List.Item>
                            <List.Item>
                            <Label size='small'style={{marginBottom:"4px"}}>Type</Label><span  style={{color:"#FF69B4"}} >&nbsp;&nbsp;Draft</span><br />
                            </List.Item>
                            <List.Item>
                            <Label size='small'style={{marginBottom:"4px"}}>Publish</Label><span  style={{color:"#FF69B4"}}>&nbsp;&nbsp;Draft</span><br />
                            </List.Item>
                            </List>
                            </Segment>
                        </GridColumn>
                        <GridColumn width="16">
                            <Segment style={{padding:0,position: "relative"}}>
                              <Image fluid src={holi} />
                              <Label attached='top left' style={{position:"absolute"}} color="blue">Sponsored</Label>
                            </Segment>
                        </GridColumn>
                    </Grid>
                </Grid.Column>
            </Grid>
        )
    }
}



const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]
  
export default EventFrontPage;