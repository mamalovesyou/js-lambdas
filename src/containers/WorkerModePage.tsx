import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: 0
    },
}));

const WorkerModePage = () => {

    const classes = useStyles();

    return (
        <Container className={classes.root} component={Paper}>
            <Typography variant="h2"> Worker Page</Typography>
        </Container>
    );
}


export default WorkerModePage;
