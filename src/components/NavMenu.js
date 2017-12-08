import React, { Component } from 'react';
import {  Menu } from 'semantic-ui-react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class NavMenu extends Component {
  state = { activeItem: 'home',

  }

  handleItemClick = (e, { name }) => {(
    this.setState({ activeItem: name })

  )}

render(){
  const categories = this.props.categories
  const {activeItem} = this.state


  return (
    <div>

        <Menu pointing>
          <Menu.Item as={Link} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          {categories.map((item)=>(
            <Menu.Item key={item.name}
              as={Link} to={item.name}
              name={item.name} active={activeItem === item.name} onClick={this.handleItemClick} />
          ))}


        </Menu>



      </div>
    )

  }
}

function mapStateToProps({categories}){
  return {
    categories
  };
}
export default connect(mapStateToProps)(NavMenu);
