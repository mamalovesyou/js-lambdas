import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(() => ({
    root: {
        padding: 0
    },
}));

const EditorModePage = () => {

    const classes = useStyles();

    return (
        <Container className={classes.root} component={Paper}>
            <Typography variant="h2"> Editor Page</Typography>
        </Container>
    );
}


export default EditorModePage;
