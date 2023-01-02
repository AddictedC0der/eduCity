import * as React from 'react';
import { Typography, Paper, TextField, Box, Fab, Autocomplete } from '@mui/material';
import { MainLayout } from '../layouts/MainLayout';
import ContentEditable from 'react-contenteditable';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';


function EditButton(props: any) {
    return (
        <button
            key={props.cmd}
            onMouseDown={evt => {
                evt.preventDefault();
                document.execCommand(props.cmd, false, props.arg);
            }}
        >
          {props.name || props.cmd}
        </button>
      );
}


function Toolbar() {
    return (
        <Box style={{width: '80%', height: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'start'}}>
            <div style={{width: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'start', columnGap: '2%'}}>
                <Fab size='small'>
                    <FormatBoldIcon />
                </Fab>
                <Fab size='small'>
                    <FormatItalicIcon />
                </Fab>
                <Fab size='small'>
                    <FormatStrikethroughIcon />
                </Fab>
                <Fab size='small'>
                    <FormatUnderlinedIcon />
                </Fab>
            </div>
            <div style={{width: '50%', display: 'flex', flexDirection: 'row'}}>
                <Autocomplete value='1' options={['1', '2', '3']} renderInput={params => <TextField {...params} />} />
                <TextField></TextField>
            </div>
        </Box>
    )
}


export function TheoryConstructor() {
    const ContentEditableRef = React.createRef<ContentEditable>();

    const [innerHTML, setInnerHTML] = React.useState<string>('');

    const [selection, setSelection] = React.useState(document.getSelection())

    React.useEffect(() => {
        console.log(selection?.toString())
    }, [selection])

    document.addEventListener('selectionchange', () => setSelection(document.getSelection()?.toString()))
    // window.addEventListener('selectionchange', () => {console.log(window.getSelection()?.toString())})
    // window.onselectionchange = () => {console.log('Changed!')}

    return (
        <MainLayout paddingMain='NONE'>
            <div style={{width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Toolbar />
                <Paper elevation={5} sx={{width: '80%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {/* @ts-ignore */}
                    <ContentEditable ref={ContentEditableRef} html={innerHTML} onChange={e => setInnerHTML(e.target.value)} style={{
                        width: '80%', height: '90%', '&:focus': {outline: '0px solid transparent', backgroundColor: 'black'}, '&:active': {outline: 'none', backgroundColor: 'black'}
                    }} />
                </Paper>
            </div>
        </MainLayout>
    )
}