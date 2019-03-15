import React,{Component} from 'react'
import {connect} from 'react-redux';
// import {withRouter,Link} from 'react-router-dom'
// import Iframe from 'react-iframe'
// import ImageEditorRc from 'react-cropper-image-editor';
// import 'cropperjs/dist/cropper.css'; 
class Test extends Component{

    componentDidMount(){
        this.props.history.push("/test")
        console.log(this.props.token)
    }

    render(){
        return(
            <div></div>
            // <div mar>
            // {/* <iframe src="https://www.postermywall.com/index.php/l/event-promo-video" height={500} width={1000} style={{marginTop:-60,marginBottom:-60}}/> */}
            // <ImageEditorRc
            //     ref='cropper'
            //     crossOrigin='true' // boolean, set it to true if your image is cors protected or it is hosted on cloud like aws s3 image server
            //     src={"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/party-poster-template-b55362a3caf3fcf72e635696b4d892d5_screen.jpg?ts=1456347861"}
            //     style={{height: 400, width: 400}}
            //     aspectRatio={16 / 9}
            //     className={'your custom class'}
            //     guides={true}
            //             rotatable={true}
            //     aspectRatio={16 / 9}
            //     imageName='image name with extension to download'
            //     // saveImage={functionToSaveImage} // it has to catch the returned data and do it whatever you want
            //     responseType='blob/base64'
            //     guides={false}/>
            // </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        token:state.auth.accessToken
    }
}

export default connect(mapStateToProps,null)(Test);