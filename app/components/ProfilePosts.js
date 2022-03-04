import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Loading from "./LoadingDotsIcon"
import NotFound from "./NotFound"
import Post from "./Post"

import Axios from "axios"
function ProfilePosts(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const { username } = useParams()
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function getPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, { cancelToken: ourRequest.token })
        setPosts(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("Ooops I did it again!")
      }
    }
    getPosts()
    return () => {
      ourRequest.cancel()
    }
  }, [username])

  if (isLoading) return <Loading />
  return (
    <div className="list-group">
      {posts.map(post => {
        return <Post post={post} key={post._id} noAuthor={true} />
      })}
    </div>
  )
}

export default ProfilePosts
