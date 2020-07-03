import React from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppStateType from '../stores/appState';
import { JobResult } from '../workers/Job';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Page from '../components/Page';
import Panel from '../components/Panel';
import ResultPanel from '../components/ResultPanel';
import PoolStatus from '../components/PoolStatus';
import { getPoolStatus } from '../stores/jobs/JobsActions';
import { useInterval } from '../hooks/useInterval';

// Ace editor
import AceEditor from 'react-ace';
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: theme.spacing(2, 0),
        padding: theme.spacing(2)
    },
    status: {
        display: 'inline-flex',
        padding: theme.spacing(1, 0),
    },
    statusIcon: {
        margin: theme.spacing(0, 1, 0, 2),
    }
}));

const mapState = (state: AppStateType) => ({
    history: state.jobs.history,
    pool: state.jobs.pool
});

const mapDispatch = (dispatch: Dispatch) => ({
    getStatus: () => dispatch(getPoolStatus()),
});

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

const WorkerModePage = ({ pool, history, getStatus }: PropsFromRedux) => {

    const classes = useStyles();

    // Refresh pool status every 5 sec
    // Handled also with effects though
    useInterval(() => getStatus(), 3000);



    return (
        <Page title="Worker Mode"
            subHeader={
                <div className={classes.status}>
                    <Typography variant="subtitle1" color="textSecondary">Status: </Typography>
                    <PoolStatus className={classes.statusIcon} pool={pool}></PoolStatus>
                </div>
            }
        >
            {(history as JobResult[]).map((job: JobResult) =>
                <Paper className={classes.root} key={job.id}>
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
