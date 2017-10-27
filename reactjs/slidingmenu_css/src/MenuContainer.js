import React, { Component } from 'react';
import MenuButton from './MenuButton';
import Menu from './Menu';
import PageContent from './PageContent';

class MenuContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false
    }

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleMouseDown(e) {
    this.toggleMenu();

    console.log("clicked");
    e.stopPropagation();
  }

  toggleMenu() {
    this.setState(
      {
        visible: !this.state.visible
      }
    );
  }

  render() {
    var visibility = "hide";

    if (this.state.visible) {
      visibility = "show";
    }

    return (
      <div>
        <MenuButton handleMouseDown={this.handleMouseDown}/>
        <Menu toggleMenu={this.toggleMenu} menuVisibility={visibility}/>
        <PageContent/>
      </div>
    );
  }
}

export default MenuContainer;