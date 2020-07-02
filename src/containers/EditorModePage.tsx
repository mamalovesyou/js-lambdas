import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PlayIcon from '@material-ui/icons/PlayArrow';
import Page from './Page';
import Panel from '../components/Panel';

// Ace editor
import AceEditor from 'react-ace';
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import { Typography, Container } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
    button: {
        margin: theme.spacing(2, 0),
    },
    panelContent: {
        padding: theme.spacing(2)
    }
}));

const initialCode = `function(){ 
    return [1,2,3].reduce((a,b) => a + b)
};`;


const EditorModePage = () => {

    const classes = useStyles();
    const [code, setCode] = React.useState(initialCode)

    return (
        <Page
            title="Editor Mode"
            subHeader={
                <Button
                    onClick={() => console.log("execute")}
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
                    <Panel header={"Result"} type="success">
                        <div className={classes.panelContent}><Typography>Result</Typography></div>
                    </Panel>
                </Grid>
            </Grid>
        </Page>
    );
}

export default EditorModePage;
