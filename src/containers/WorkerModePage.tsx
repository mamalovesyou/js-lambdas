import React from 'react';
import { connect } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Page from '../components/Page';
import Panel from '../components/Panel';
import ResultPanel from '../components/ResultPanel';

// Ace editor
import AceEditor from 'react-ace';
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3)
    },
    code: {
        margin: 0,
        width: '100%',
        maxHeight: '200px'
    },
}));

const initialCode = `function(){ 
    return [1,2,3].reduce((a,b) => a + b)
};
function(){ 
    return [1,2,3].reduce((a,b) => a + b)
};
function(){ 
    return [1,2,3].reduce((a,b) => a + b)
};
function(){ 
    return [1,2,3].reduce((a,b) => a + b)
};
function(){ 
    return [1,2,3].reduce((a,b) => a + b)
};`;


const WorkerModePage = ({ }) => {

    const classes = useStyles();

    return (
        <Page title="Worker Mode">
            <Paper className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Panel header="Function" >
                            <AceEditor
                                width='100%'
                                mode="javascript"
                                theme="monokai"
                                fontSize={14}
                                showGutter={false}
                                showPrintMargin={true}
                                minLines={5}
                                maxLines={8}
                                value={initialCode}
                                readOnly
                            />
                        </Panel>

                    </Grid>
                    <Grid item xs={6}>
                        <ResultPanel inProgress={false} result={"text"}></ResultPanel>
                    </Grid>
                </Grid>
            </Paper>
        </Page>
    );
}


export default connect(null, null)(WorkerModePage);
