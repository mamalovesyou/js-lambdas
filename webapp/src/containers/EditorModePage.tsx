import React from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import IAppState from '../stores/appState';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PlayIcon from '@material-ui/icons/PlayArrow';
import Page from '../components/Page';
import ResultPanel from '../components/ResultPanel';

// Ace editor
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver'; // needed to avoid worker error
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

// Redux actions
import {submitScript} from '../stores/jobs/JobsActions';


const useStyles = makeStyles((theme: Theme) => ({
    button: {
        margin: theme.spacing(2, 0),
    }
}));

const initialCode = `async function(){
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await sleep(10000);
    return [1,2,3].reduce((a,b) => a + b)
};`;

const mapState = (state: IAppState) => ({
    inProgress: state.jobs.latest ? state.jobs.latest.inProgress : false,
    result: state.jobs.latest ? state.jobs.latest.result : undefined,
    error: state.jobs.latest ? state.jobs.latest.error : undefined,
    finishedAt: state.jobs.latest ? state.jobs.latest.finishedAt : undefined
});

const mapDispatch = (dispatch: Dispatch) => ({
    submitScript: (script: string) => dispatch(submitScript(script))
});

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

const EditorModePage = ({error, result, inProgress, submitScript, finishedAt}: PropsFromRedux) => {

    const classes = useStyles();
    const [code, setCode] = React.useState(initialCode)

    const handleExecuteClick = () => {
        submitScript(code);
    }

    return (
        <Page
            title="Editor Mode"
            subHeader={
                <Button
                    onClick={handleExecuteClick}
                    variant="contained"
                    className={classes.button}
                    startIcon={<PlayIcon />}
                >
                    Execute
                    </Button>
            }
        >
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <AceEditor
                        mode="javascript"
                        theme="monokai"
                        onChange={setCode}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={code}
                        setOptions={{
                            enableBasicAutocompletion: false,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                        }} />
                </Grid>
                <Grid item xs={6}>
                    <ResultPanel inProgress={inProgress} result={result} error={error} finishedAt={finishedAt}></ResultPanel>
                </Grid>
            </Grid>
        </Page>
    );
}

export default connector(EditorModePage);
