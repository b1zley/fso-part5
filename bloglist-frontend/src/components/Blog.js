
import { useState } from 'react'
import PropTypes from 'prop-types'



const Blog = ({ blog,
  incrementBlogLikesByOne,
  removeBlog, user,
  reorderBlogsBasedOnLikes, blogIndex
}) => {
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
    reorderBlogsBasedOnLikes()

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
        <button className='blogLikeButton' onClick={handleLikeButtonClick}> like </button>
      </>
    )
  }

  const removeButton = () => {

    return (
      <button className="blogRemoveButton" onClick={handleRemoveButtonClick}>delete</button>
    )
  }



  const viewButton = () => {

    return (

      <>

        <button className='blogViewButton' onClick={handleViewButtonClick} >{buttonText}</button>
      </>

    )
  }



  const additionalInfo = () => {
    if (showInfo === true && user.username === blog.user.username) {
      return (
        <>
          <div className='blogUrl'>{blog.url}</div>
          <div className='blogLikes'>likes {blogLikes} {likeButton()} </div>
          <div className='blogUsername'>{blog.user.name}</div>
          <div className='removeButton'>{removeButton()}</div>
        </>
      )
    } else if (showInfo === true) {
      return (
        <>
          <div className='blogUrl'>{blog.url}</div>
          <div className='blogLikes'>likes {blogLikes} {likeButton()} </div>
          <div className='blogUsername'>{blog.user.name}</div>
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

  const blogId = `blogNumber${blogIndex}`


  return (
    <>
      <div style={blogStyle} className='blog' id={blogId}>
        <div className='blogAlwaysShown'>
          {blog.title} {blog.author} {viewButton()}
        </div>
        <div className='blogSometimesShown'>
          {additionalInfo()}
        </div>
      </div>

    </>
  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  incrementBlogLikesByOne: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired

}


export default Blog