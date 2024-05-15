import React from 'react'

const Today = async() => {
  await fetch("http://localhost:3000/api/todo/today")
  return (
    <div>Today</div>
  )
}

export default Today