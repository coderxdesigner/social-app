import React, { useEffect, useContext, useState } from "react"
import Page from "./Page"
import { useParams } from "react-router-dom"
import Axios from "axios"
import StateContext from "../StateContext"
import { useImmer } from "use-immer"

//components
import ProfilePosts from "./ProfilePosts"

function Profile() {
  const { username } = useParams()
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    followActionLoading: false,
    startFollowingRequestCount: 0,
    stopFollowingRequestCount: 0,
    profileData: {
      profileUsename: "",
      profileAvatar: "https://gravatar.com/avatar/placeholder?s=120",
      isFollowing: false,
      counts: { postCount: "", followerCount: "", followingCount: "" }
    }
  })
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function data() {
      try {
        const response = await Axios.post(`/profile/${username}`, { token: appState.user.token, cancelToken: ourRequest.token })
        setState(draft => {
          draft.profileData = response.data
        })
      } catch (e) {
        console.log("oops I did it again")
      }
    }
    data()
    return () => {
      ourRequest.cancel()
    }
  }, [])
  function startFollowing() {
    setState(draft => {
      draft.startFollowingRequestCount++
    })
  }
  return (
    <Page title="Profile Screen">
      <h2>
        <img className="avatar-small" src={state.profileData.profileAvatar} /> {state.profileData.profileUsename}
        {appState.loggedIn && !state.profileData.isFollowing && appState.user.username != state.profileData.profileUsename && state.profileData.profileUsername != "..." && (
          <button onClick={startFollowing} disabled={state.followActionLoading} className="btn btn-primary btn-sm ml-2">
            Follow <i className="fas fa-user-plus"></i>
          </button>
        )}
      </h2>
      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {state.profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {state.profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {state.profileData.counts.followingCount}
        </a>
      </div>
      <ProfilePosts />
    </Page>
  )
}

export default Profile
