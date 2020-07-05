import React from 'react';
import Panel from './Panel';
import { FormatTimeAgo } from '../utils';
import useInterval from '../hooks/useInterval';

// Ace editor
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver'; // needed to avoid worker error
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

type Props = {
    script?: string;
    recievedAt?: number;
    interval?: number;
}

export const ScriptPanel = ({ script, recievedAt, interval=15 }: Props) => {

    // Update job finished time
    const [subHeader, setSubHeader] = React.useState("");
    const refresh = interval * 1000;
    useInterval(() => { setSubHeader(getSubHeader()) }, refresh);
    React.useEffect(() => { setSubHeader(getSubHeader()) }, [recievedAt])


    const getSubHeader = () => {
        if (recievedAt) return "recieved " + FormatTimeAgo(recievedAt);
        return "";
    }

    return (
        <Panel header="Function" subHeader={subHeader}>
            <AceEditor
                width='100%'
                mode="javascript"
                theme="monokai"
                fontSize={14}
                showGutter={false}
                showPrintMargin={true}
                minLines={8}
                maxLines={8}
                value={script}
                readOnly
            />
        </Panel>
    );
}

export default ScriptPanel;