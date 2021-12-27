import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCallback } from 'react';
import {useHttp} from '../hooks/http.hook'
import CircularProgress from '@mui/material/CircularProgress'

export const FormDialog = (props) => {
    const postId = props.post.id

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState(props.post.title);
    const [content, setContent] = React.useState(props.post.content);

    const { loading, request, error } = useHttp()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const changeHandlerTitle = event => {
        setTitle(event.target.value)
    }

    const changeHandlerContent = event => {
        setContent(event.target.value)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSend = async() => {
        const data = {title: title, content: content}
        const fetched = await request('http://localhost:8000/api/posts/' + postId + '/', 'PUT', data)

        console.log(fetched)

        props.setPost(fetched)
        
        setOpen(false);
    };


    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Change the data and press "Send".
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        defaultValue={title}
                        onChange={changeHandlerTitle}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        id="content"
                        label="Content"
                        type="text"
                        defaultValue={content}
                        onChange={changeHandlerContent}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {!loading && <Button onClick={handleSend}>Send</Button>}
                    {loading && <CircularProgress />}
                </DialogActions>
            </Dialog>
        </div>
    );
}

