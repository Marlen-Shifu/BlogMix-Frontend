import * as React from 'react';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import {FormDialog} from './ChangePostDialog'
import {useHttp} from '../hooks/http.hook'
import CircularProgress from '@mui/material/CircularProgress'



export const Post = (props) => {

    const [data, setData] = React.useState(props.data)

	const { loading, request, error } = useHttp()

	const fetching = React.useCallback(async () => {
        try{
            const fetched = await request(`http://localhost:8000/api/posts/${props.data.id}/`, 'DELETE')
            
        }catch (e) {
            console.log(e)
        }

        setData(null)

	}, [request])

    if(!data){
        return ''
    }


    return (

        <Card>
            <Typography sx={{ fontSize: 24 }}>{data.title}</Typography>
            <Typography>{data.content}</Typography>
            <Typography sx={{ fontStyle: "italic" }}>{data.date}</Typography>
            <FormDialog post={ data } setPost={setData}></FormDialog>

            {!loading && <Button variant='outlined' onClick={fetching} color='error'>Delete</Button>}
            {loading && <CircularProgress />}
            
        </Card>
    )
}

