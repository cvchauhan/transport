import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class DashboardCount extends Component {      
    render() {      
        return (
            <>
            <Grid container spacing={24}>
                <Grid item md={3} container spacing={1}>
                    <Card>
                        <CardContent>
                            <Typography>
                                Number of Party: <strong>{this.props.partyCount}</strong>
                            </Typography>              
                        </CardContent>
                    </Card>
                </Grid>                
                <Grid item md={3} container spacing={1}>
                    <Card>
                        <CardContent>
                            <Typography>
                                Number of Suppliers: <strong>{this.props.suppliersCount}</strong>
                            </Typography>              
                        </CardContent>
                    </Card>
                </Grid>                
                <Grid item md={3} container spacing={1}>
                    <Card>
                        <CardContent>
                            <Typography>
                                Number of Vehicles:  <strong>{this.props.vehicalCount}</strong>
                            </Typography>              
                        </CardContent>
                    </Card>
                </Grid>                
                <Grid item md={3} container spacing={1}>
                    <Card>
                        <CardContent>
                            <Typography>
                                Number of Drivers: <strong>{this.props.driverCount}</strong>
                            </Typography>              
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>                       
            <div className="row">&nbsp;</div>
            </>
        );
    }
}

export default DashboardCount;