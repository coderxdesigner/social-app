import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Page from "./Page"
import Axios from "axios"

function ViewSinglePost() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState()

  useEffect(() => {
    async function getPost() {
      try {
        const response = await Axios.get(`/post/${id}`)
        console.log(response.data)
        setPost(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("Ooops I did it again!")
      }
    }
    getPost()
  }, [])

  if (isLoading)
    return (
      <Page title="Posts Loading">
        <div>Loading...</div>
      </Page>
    )
  const date = new Date(post.createdDate)
  const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  return (
    <Page title={post.title}>
      <div className="container container--narrow py-md-5">
        <div className="d-flex justify-content-between">
          <h2>{post.title}</h2>
          <span className="pt-2">
            <Link to="#" className="text-primary mr-2" title="Edit">
              <i className="fas fa-edit"></i>
            </Link>
            <a className="delete-post-button text-danger" title="Delete">
              <i className="fas fa-trash"></i>
            </a>
          </span>
        </div>

        <p className="text-muted small mb-4">
          <Link to={`/profile/${post.author.username}`}>
            <img className="avatar-tiny" src={post.author.avatar} />
          </Link>
          Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
        </p>

        <div className="body-content">{post.body}</div>
      </div>
    </Page>
  )
}

export default ViewSinglePost
