import * as React from 'react';
import { Typography, Paper, List, ListItem, Box, TextField, Fab, Menu, MenuItem, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { IChatMessage, IRealChatMessage } from '../../models/chat.model';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IUser } from '../../models/user.model';
import { ChatService } from '../../http/chatAPI';


interface IChatMessageProps {
    message: IRealChatMessage;
    userId: number;
    onEditStart: (ChatMessage: IRealChatMessage) => void;
    onReply: (chatMessage: IRealChatMessage) => void;
}


function ChatMessage(props: IChatMessageProps) {
    const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
    const open = Boolean(anchor);
    const [reply, setReply] = React.useState<IRealChatMessage | false>(false);

    React.useEffect(() => {
        const fetchData = async () => {
            if (props.message.replyTo) {
                const target = await (await ChatService.getMessage(props.message.replyTo.id)).data;
                setReply(target);
            }
        }
        fetchData();
    }, [])


    const handleOpenMenu = (event: React.MouseEvent) => {
        setAnchor(event.currentTarget as HTMLElement);
    }

    const handleCloseMenu = () => {
        setAnchor(null);
    }

    const deleteMessage = () => {
        ChatService.deleteMessage(props.message.id);
    }

    const editMessage = () => {
        props.onEditStart(props.message);
    }

    const replyMessage = () => {
        props.onReply(props.message);
    }

    const renderMenuOptions = () => {
        const decorator = (func: () => void) => {
            setAnchor(null);
            func()
        }

        const options = [
            {label: 'Редактировать', func: editMessage, id: '1'},
            {label: 'Удалить', func: deleteMessage, id: '2'}
        ]
        if (props.message.author.id === props.userId) {
            return (
                options.map(option => {return (
                    <MenuItem key={option.id} onClick={() => decorator(option.func)}>{option.label}</MenuItem>
                )})
            )
        } else {
            return (
                <MenuItem key={3} onClick={() => decorator(replyMessage)}>Ответить</MenuItem>
            )
        }
    }

    const renderReplyPanel = () => {
        if (!reply) {
            return;
        }
        return (
            <Paper elevation={3} sx={{display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '90%', display: 'flex', flexDirection: 'column'}}>
                    <Typography variant='caption'>{reply.author.UserLogin}</Typography>
                    <Typography>{reply.text}</Typography>
                </div>
            </Paper>
        )
    }

    return (
        <ListItem key={props.message.id}
                sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                alignItems: props.message.author.id === props.userId ? 'end' : 'start', maxWidth: '90%',
                alignSelf: props.message.author.id === props.userId ? 'end' : 'start'}}>
            
            <Typography>{props.message.author.UserLogin}</Typography>
            {renderReplyPanel()}
            <Paper sx={{backgroundColor: 'gray', padding: '1%', minWidth: '5vw', maxWidth: '30vw'}} onClick={handleOpenMenu}>
                <Typography sx={{maxWidth: '100%', flexGrow: '1', wordWrap: 'break-word'}}>{props.message.text}</Typography>
            </Paper>
            <Typography sx={{color: 'gray'}}>{new Date(props.message.sendTime).toLocaleTimeString()}</Typography>
            <Menu
                id="basic-menu"
                anchorEl={anchor}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {renderMenuOptions()}
            </Menu>
        </ListItem>
    )
}


interface ChatInputBoxProps {
    onSend: (newMsg: string) => void;
    user: IUser;
    editingMessage: IRealChatMessage | false;
    onEdit: (messageDto: IRealChatMessage) => void;
    replyingTo: IRealChatMessage | false;
    onStopReplying: () => void;
}


function ChatInputBox(props: ChatInputBoxProps) {
    const initial = props.editingMessage ? props.editingMessage.text : '';
    const [msg, setMsg] = React.useState<string>(initial);

    const stopReplying = () => {
        props.onStopReplying();
    }

    const handleChangeMsg = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMsg(event.target.value);
    }

    const sendMsg = () => {
        if (typeof props.editingMessage === 'object') {
            props.onEdit({...props.editingMessage, text: msg, isEdited: true});
            setMsg('');
            return;
        }
        props.onSend(msg);
        setMsg('');
    }

    const renderReplyPanel = () => {
        if (!props.replyingTo) {
            return;
        }
        return (
            <Paper elevation={3} sx={{display: 'flex', flexDirection: 'row', width: '94%'}}>
                <div style={{width: '90%', display: 'flex', flexDirection: 'column'}}>
                    <Typography variant='caption'>{props.replyingTo.author.UserLogin}</Typography>
                    <Typography>{props.replyingTo.text}</Typography>
                </div>
                <Button sx={{display: 'flex', justifySelf: 'flex-end'}} onClick={stopReplying}>X</Button>
            </Paper>
        )
    }

    return (
        <>
        {renderReplyPanel()}
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <TextField value={msg} onChange={handleChangeMsg} sx={{width: '100%'}} />
            <Fab onClick={sendMsg} disabled={msg.length ? false : true} sx={{marginLeft: '1%'}}>
                <SendIcon />
            </Fab>
        </Box>
        </>
        
    )
}


export function Chat() {    
    const [msgs, setMsgs] = React.useState<IRealChatMessage[]>([])
    const [editingMessage, setEditingMessage] = React.useState<IRealChatMessage | false>(false);
    const [isReplying, setIsReplying] = React.useState<IRealChatMessage | false>(false);

    const { user } = useTypedSelector(state => state.user)
    
    const { load_messages, editMessage, createMessage, deleteMessage } = useActions()
    const { messages } = useTypedSelector(state => state.chat)

    React.useEffect(() => {
        load_messages();
        setMsgs(messages ? messages : []);
    }, [])

    const addMsg = async (newMsg: string) => {
        const result = generateMessageFromPlain(newMsg);
        const created = await (await ChatService.createMessage(result)).data;
        setMsgs(msgs.concat([created]))
    }

    const startEditing = (message: IRealChatMessage) => {
        setEditingMessage(message);
        console.log(message)
    }

    const EditMessage = (messageDto: IRealChatMessage) => {
        console.log(messageDto)
        editMessage(messageDto.id, messageDto.text);
    }

    const replyMessage = (message: IRealChatMessage) => {
        setIsReplying(message);
    }

    const generateMessageFromPlain = (plain: string): IChatMessage => {
        return {
            author: user.user,
            text: plain,
            replyTo: isReplying ? isReplying.id : -1,
            isEdited: false,
            sendTime: (new Date()).toString()
        }
    }

    return (
        <Paper elevation={5} sx={{height: '100%'}} aria-label='chatPaper'>
            <List sx={{height: '80%', maxHeight: '80%', overflow: 'auto'}}>
                {msgs.map(msg => {return (<ChatMessage message={msg} userId={user.user.id} onEditStart={startEditing} onReply={replyMessage} />)})}
            </List>
            <div style={{padding: '1%'}}>
                <ChatInputBox
                    onSend={addMsg}
                    user={user.user}
                    editingMessage={editingMessage}
                    onEdit={EditMessage}
                    replyingTo={isReplying}
                    onStopReplying={() => setIsReplying(false)} />
            </div>
            
        </Paper>
    )
}