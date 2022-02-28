import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Loading from "./LoadingDotsIcon"
import NotFound from "./NotFound"

import Axios from "axios"
function ProfileFollowers(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const { username } = useParams()
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function getPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/followers`, { cancelToken: ourRequest.token })
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
      {posts.length &&
        posts.map((follower, index) => {
          return (
            <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
              <img className="avatar-tiny" src={follower.avatar} />
              {follower.username}
            </Link>
          )
        })}
      {!posts.length && <div>No followers yet, say something witty and make new friends!</div>}
    </div>
  )
}

export default ProfileFollowers
