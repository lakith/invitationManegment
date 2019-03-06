import React,{Component} from 'react'
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom'

class Test extends Component{

    componentDidMount(){
        this.props.history.push("/test")
        console.log(this.props.token)
    }

    render(){
        return(
            <div>
                <h1>test</h1>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        token:state.auth.token
    }
}

export default connect(mapStateToProps,null)(Test);