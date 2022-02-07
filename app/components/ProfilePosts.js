import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Loading from "./LoadingDotsIcon"

import Axios from "axios"
function ProfilePosts(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])
  const { username } = useParams()
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`)
        setPosts(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("Ooops I did it again!")
      }
    }
    getPosts()
  }, [])
  if (isLoading) return <Loading />
  return (
    <div className="list-group">
      {posts.map(post => {
        const date = new Date(post.createdDate)
        const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        return (
          <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={post.author.avatar} /> <strong>{post.title}</strong> <span className="text-muted small">on {dateFormatted} </span>
          </Link>
        )
      })}
    </div>
  )
}

export default ProfilePosts
