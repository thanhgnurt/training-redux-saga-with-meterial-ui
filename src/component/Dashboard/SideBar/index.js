import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import styles from "./styles";
import Drawer from "@material-ui/core/Drawer";
import { ADMIN_ROUTES } from "./../../../constants/index";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

class SideBar extends Component {
  toggleDrawer = (value) => {
    const {onToggleSidebar}= this.props
    if (onToggleSidebar) {
      onToggleSidebar(value)
    }
  };

  renderList = () => {
    const { classes } = this.props;
    let xhtml = null;
    xhtml = (
      <div className={classes.list}>
        <List component="div">
          {ADMIN_ROUTES.map((item) => {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                exact={item.exact}
                className={classes.menuLink}
                activeClassName={classes.menuLinkActive}
              >
                <ListItem className={classes.menuItem} button>
                  {item.name}
                </ListItem>
              </NavLink>
            );
          })}
        </List>
      </div>
    );

    return xhtml;
  };
  render() {
    const { classes,showSidebar } = this.props;
    return (
      <Drawer
        open={showSidebar}
        onClose={() => this.toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="persistent"
      >
        {this.renderList()}
      </Drawer>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object,
  showSidebar: PropTypes.bool,
  onToggleSidebar : PropTypes.func,
};

export default withStyles(styles)(SideBar);
