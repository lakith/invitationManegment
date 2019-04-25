import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {Image, Header, Grid } from 'semantic-ui-react';
import logo from '../../assessts/rsvpster-logo (1).png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './navBar.css'
class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  

  render() {
    let user = {...this.props.user}
    console.log(user.profileUrl)

    let signIn = null;
    if(this.props.isAthenticated){
        signIn = (
          <NavItem>
          <NavLink href="/components/"><div className="navSign"><Image size="mini" style={{marginTop:-5}} floated="left" circular src={user.profileUrl}  /></div><div className="navSign">Signed In As {user.username} </div></NavLink>
          </NavItem>
        )
    }

    let content = null
    if(this.props.isAthenticated){
      content = (
         <div>
        <Grid> <Grid.Column computer={16} mobile={15} tablet={15}> 
        <Navbar color="dark" dark expand="md">
          <NavbarBrand style={{background:"#AF84DE",marginTop:-10,marginBottom:-8,marginLeft:-14,paddingLeft:15,paddingRight:15}}><Link to="/"><Image size="small" src={logo} /></Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse className="navStyle" isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {signIn}
              <NavItem>
                <NavLink><Link to="user-search">View Users</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/event-main">Create Event</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to="/my-events">View My Events</Link></NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  My Account
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <div ><Image size="mini"  circular src={user.profileUrl}  /></div><div >Signed in as {user.username} </div>
                  </DropdownItem>
                  <DropdownItem>
                    Profile
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to={this.props.isAthenticated?"/logout":"/login"}>{this.props.isAthenticated?"Logout":"Login"}</Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        </Grid.Column>
       </Grid>
      </div>
      )
    } else {
      content = (
          <div>
          <Grid> <Grid.Column computer={16} mobile={15} tablet={15}> 
          <Navbar color="dark" dark expand="md">
            <NavbarBrand style={{background:"#AF84DE",marginTop:-10,marginBottom:-8,marginLeft:-14,paddingLeft:15,paddingRight:15}}><Link to="/"><Image size="small" src={logo} /></Link></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse className="navStyle" isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink><Link to="/">Home</Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to="/">About us</Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link to="/">Contact us</Link></NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    My Account
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                    <Link to="/auth">Sign up</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <Link to={this.props.isAthenticated?"/logout":"/login"}>{this.props.isAthenticated?"Logout":"Login"}</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
          </Grid.Column>
        </Grid>
        </div>
      )
    }

    return content;
  }
}

const mapStateToProps = (state) => {
  return{
    user : state.auth.userData,
    isAthenticated: state.auth.accessToken != null
  }
}

const mapDispatchToProp = (dispatch) => {
  return{
  }
}

export default connect(mapStateToProps,mapDispatchToProp)(NavBar);