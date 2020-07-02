import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppStateType from '../stores/appState';
import { JobResult } from '../workers/Job';
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
        margin: theme.spacing(2, 0),
        padding: theme.spacing(2)
    },
    code: {
        margin: 0,
        width: '100%'
    },
}));

const mapState = (state: AppStateType) => ({
    history: state.jobs.history
});

const connector = connect(mapState, null)

type PropsFromRedux = ConnectedProps<typeof connector>


const WorkerModePage = ({ history }: PropsFromRedux) => {

    const classes = useStyles();
    const [jobsDone, setJobsDone] = React.useState([]);

    React.useEffect(() => {
        setJobsDone(history)
    }, [history])

    return (
        <Page title="Worker Mode">
            {jobsDone.map((job:  JobResult) =>
                <Paper className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Panel header="Function" >
                                <AceEditor
                                    width='100%'
                                    mode="javascript"
                                    theme="monokai"
                                    fontSize={14}
                                    showGutter={false}
                                    showPrintMargin={true}
                                    minLines={8}
                                    maxLines={8}
                                    value={job.script}
                                    readOnly
                                />
                            </Panel>

                        </Grid>
                        <Grid item xs={6}>
                            <ResultPanel result={job.result} error={job.error}></ResultPanel>
                        </Grid>
                    </Grid>
                </Paper>

            )}
        </Page>
    );
}


export default connector(WorkerModePage);
