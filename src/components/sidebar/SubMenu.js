import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <List to={item.path}  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav" aria-labelledby="nested-list-subheader">
        <ListItem >
          <ListItemIcon>
          {item.icon}
          </ListItemIcon>
          <div onClick={item.subNav && showSubnav}>
          <Link to={item.path} style={{ color: 'white' }} >{item.title}</Link>
          {item.subNav && subnav
            ? <ExpandLessIcon style={{ color: 'white', marginLeft: '30px', }}/>
            : item.subNav
            ? <ExpandMoreIcon style={{ color: 'white', marginLeft: '30px', }}/>
            : null}
            </div>
        </ListItem>
      </List>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <List to={item.path} key={index}>
            <ListItem style={{ marginLeft: '40px', paddingTop: '0px', paddingBottom: '0px' }}>
              <Link to={item.path} style={{ color: 'white' }} >{item.title}</Link>
            </ListItem>
              
            </List>
          );
        })}
    </>
  );
};

export default SubMenu;