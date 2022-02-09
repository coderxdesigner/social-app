import React, { useEffect, useState } from "react"
import { useImmerReducer } from "use-immer"
import { useParams, Link } from "react-router-dom"
import Page from "./Page"
import Axios from "axios"
import Loading from "./LoadingDotsIcon"

function EditPost() {
  const originalState = {
    title: {
      value: "",
      hasErrors: false,
      message: ""
    },
    body: {
      value: "",
      hasErrors: false,
      message: ""
    },
    isFetching: true,
    isSaving: false,
    id: useParams().id,
    sendCount: 0
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case "fetchComplete":
        draft.title.value = action.value.title
        draft.body.value = action.value.body
        draft.isFetching = false
        return
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, originalState)
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function getPost() {
      try {
        const response = await Axios.get(`/post/${state.id}`, { cancelToken: ourRequest.token })
        console.log(response.data)
        dispatch({ type: "fetchComplete", value: response.data })
      } catch (e) {
        console.log("Ooops I did it again!")
      }
    }
    getPost()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  if (state.isFetching)
    return (
      <Page title="Posts Loading">
        <Loading />
      </Page>
    )

  return (
    <Page title="Edit post">
      <form>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input value={state.title.value} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea value={state.body.value} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save Updates</button>
      </form>
    </Page>
  )
}

export default EditPost
