import { useState } from 'react'



const Blog = ({ blog,
  incrementBlogLikesByOne,
  removeBlog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const [buttonText, setButtonText] = useState('Show')

  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const handleViewButtonClick = () => {
    if (showInfo === false) {
      setShowInfo(true)
      setButtonText('Hide')
    } else if (showInfo === true) {
      setShowInfo(false)
      setButtonText('Show')
    }

    console.log(blog)
  }
  const handleLikeButtonClick = () => {
    console.log(blog)
    console.log('like button clicked at above blog')
    incrementBlogLikesByOne(blog)
    setBlogLikes(blog.likes)

  }
  const handleRemoveButtonClick = () => {
    console.log('in remove button')
    console.log(blog)
    if (window.confirm(`Remove blog ${blog.name} by ${blog.author}?`)) {
      removeBlog(blog)
    }
  }

  const likeButton = () => {

    return (
      <>
        <button onClick={handleLikeButtonClick}> like </button>
      </>
    )
  }

  const removeButton = () => {
    //implement removeButton
    return (
      <button onClick={handleRemoveButtonClick}>delete</button>
    )
  }



  const viewButton = () => {


    return (

      <>

        <button onClick={handleViewButtonClick} >{buttonText}</button>
      </>

    )
  }



  const additionalInfo = () => {
    if (showInfo === true) {
      return (
        <>
          <div>{blog.url}</div>
          <div>likes {blogLikes} {likeButton()} </div>
          <div>{blog.user.name}</div>
          <div>{removeButton()}</div>
        </>
      )
    } else {
      return
    }
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <>
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} {viewButton()}
        </div>
        {additionalInfo()}
      </div>

    </>
  )

}


export default Blog