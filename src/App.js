import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Pagination, Stack, TextField, Link } from '@mui/material'
// const BASE_URL = 'http://hn.algolia.com/api/v1/search?'

function App() {

  const [post, setPost] = useState([])
  const [query, setQuery] = useState('react')
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    axios.get(`http://hn.algolia.com/api/v1/search?query=${query}&page=${page - 1}`).then(({ data }) => {
      console.log(data)
      setPost(data.hits)
      setPageCount(data.nbPages)
    })
  }, [query, page])

  return (
    <Container>
      <TextField
        style={{ margin: 10 }}
        fullWidth
        label='query'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Stack
        style={{ margin: 10 }}
        spacing={2}
      >
        <Pagination
          style={{ margin: 10 }}
          count={pageCount}
          page={page}
          onChange={(e , num) => setPage(num)}
        />
        {
          post.map(post => (
            <Link key={post.objectID} href={post.url}>
              {post.title || post.story_title}
            </Link>
          ))
        }
      </Stack>
    </Container>
  );
}

export default App;
