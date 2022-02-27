import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Loading from "./LoadingDotsIcon"
import NotFound from "./NotFound"

import Axios from "axios"
function ProfileFollowing(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const { username } = useParams()
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function getPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/following`, { cancelToken: ourRequest.token })
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
      {posts.map((follower, index) => {
        return (
          <Link key={index} to={`/profile/${follower.username}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={follower.avatar} />
            {follower.username}
          </Link>
        )
      })}
    </div>
  )
}

export default ProfileFollowing
