import React,{Component} from 'react'
import ReactQuill, { Quill, Mixin, Toolbar ,Editor} from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import { Segment, Grid, Input, GridColumn, Label, Image, Header, Divider, List, Button } from 'semantic-ui-react';
import holi from '../../assessts/holi.jpg'

const baseImage = '<p><img src="https://d2slcw3kip6qmk.cloudfront.net/marketing/blogs/press/0-CTA-GRAPHICS/Pick-A-Template_mint.png" /></p>'

class EventFrontPage extends Component {
    constructor(props) {
        super(props)
        this.state = { text: baseImage } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
      }

      componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    
    
      handleChange(value) {
        console.log(value)
        this.setState({ text: value })
      }

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

    render(){
        return(
            <Grid columns={2} stackable >
                <Grid.Column width="12" style={{paddingRight:0}} >
                    <Segment>
                        <div>
                        <Input fluid label={{ icon: 'asterisk',color: 'pink' }} size='big' labelPosition='left corner' placeholder='Poster header...' />
                        <br />
                        </div>
                        <div>
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
                        <Button fluid color="pink">Publish Poster</Button>
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