import * as React from 'react';
import {Post} from './components/PostCard'
import {useHttp} from './hooks/http.hook'
import CircularProgress from '@mui/material/CircularProgress'

function App() {

	const [data, setData] = React.useState([])

	const { loading, request, error } = useHttp()

	const fetching = React.useCallback(async () => {
		const fetched = await request('http://localhost:8000/api/posts/')

		setData(fetched)
	}, [request, setData])

	React.useEffect(() => {
		fetching()
	}, [fetching])

	const postsList = data.map((postData) => 
		<Post data={postData}></Post>
	)

	return (
		<div>
			<h1>Hello world</h1>
			{!loading && <div>{postsList}</div>}
            {loading && <CircularProgress />}
		</div>
		);
}

export default App;
