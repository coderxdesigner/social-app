import React, { useEffect } from "react"

function FlashMessages(props) {
  return (
    <div className="floating-alerts">
      {props.messages.map((msg, index) => {
        return (
          <div className="floating-alerts">
            <div key={index} className="alert alert-success text-center floating-alert shadow-sm">
              {msg}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessages
