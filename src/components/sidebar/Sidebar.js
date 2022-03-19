import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import './Sidebar.css';
import { Switch, Route, } from 'react-router-dom';
import LorryForm from '../../pages/LR/lorry_form';
import LorryJson from '../../pages/LR/lorry_json';
import LorryTable from '../../pages/LR/lorry_table';
import Print from '../../pages/LR/Print';
import Home from '../../pages/Home';
import Reports from '../../pages/Reports';
import Products from '../../pages/Products';
import PartyTable from '../../pages/party/PartyTable';
import DriverTable from '../../pages/driver/DriverTable';
import VehicleTable from '../../pages/vehicle/VehicleTable';
import SupplierTable from '../../pages/supplier/SupplierTable';

import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import PartyView from "../../pages/party/PartyView";
import SupplierView from "../../pages/supplier/SupplierView";
// import {
//   HashRouter as Router,
//   Route,
//   } from 'react-router-dom';

const drawerWidth = 220;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 15
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(0deg)"
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    transform: "rotate(180deg)"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  grow: {
    flexGrow: 1
  }
});

class MiniDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      open: false,
      anchorEl: null,
      opendrop: false,
    };
  }
  handleClick = () => {
    if (this.state.opendrop) {
      this.setState({ opendrop: false })
    } else {
      this.setState({ opendrop: true })
    }
  };

  handleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} foojon={classNames(classes.appBar, { [classes.appBarShift]: this.state.open })}
        >
          <Toolbar disableGutters={true}>
            <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classes.menuButton}
            >
              <MenuIcon
                // classes={{
                //   root: this.state.open
                //     ? classes.menuButtonIconOpen
                //     : classes.menuButtonIconClosed
                // }}
              />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow} noWrap
            ><span className="font-weight-bold" style={{fontFamily: 'cursive'}}><span style={{color: '#F1C40F'}}>Transport</span>Sevak</span></Typography>
            <div>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
        
          <div className={classes.toolbar} />
           {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
         
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/* <Router> */}
          <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/reports' component={Reports} />
              <Route exact path='/products' component={Products} />
              <Route path='/party' component={PartyTable} />
              <Route path='/party-view/:id' component={PartyView} />
              <Route path='/supplier-view/:id' component={SupplierView} />
              <Route exact path='/driver' component={DriverTable} />
              <Route path='/supplier' component={SupplierTable} />
              <Route exact path='/vehicle'>
                <VehicleTable />
              </Route>
              <Route path='/lorry' component={LorryTable} />
              <Route path='/lorry-form' component={LorryForm} />
              <Route path='/lorry-json' component={LorryJson} />
              <Route path='/print' component={Print} />
              {/* <Route path='/lory-receipt' component={LoryReceipt} /> */}
              {/* <Route path='/party-form' component={PartyForm} /> */}
              {/* <Route path='/pod-form' component={POD} /> */}
              {/* <Route path='/supplier-form' component={SupplierForm} /> */}
            </Switch>
          {/* </Router> */}
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
