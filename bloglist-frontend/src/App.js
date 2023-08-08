import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
//import loginService
import loginService from './services/login'

//import notification
import Notification from './components/Notification'

import BlogForm from './components/BlogForm'

import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  //user information
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // blogToAdd information
  // const [titleBlogToAdd, setTitleBlogToAdd] = useState('')
  // const [authorBlogToAdd, setAuthorBlogToAdd] = useState('')
  // const [urlBlogToAdd, setUrlBlogToAdd] = useState('')


  //notification messages
  // const [errorMessage, setErrorMessage] = useState(null)
  const [creationMessage, setCreationMessage] = useState(null)

  const [loginMessage, setLoginMessage] = useState(null)






  //effect hooks
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  useEffect(() => {
    const loggedInUserJSON = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    if (loggedInUserJSON) {
      const a = loggedInUserJSON
      setUser(a)
      blogService.setToken(a.token)
    }
  }, [])

  //functions and calls
  const currentUserLogout = () => {
    return (
      <div>
        Currently logged in as {user.name}
        <button
          onClick={logout}
        >logout</button>
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('in handle login')

    const credentials = {
      username,
      password
    }

    try {
      const user = await loginService.login(credentials)
      setLoginMessage(user)
      setTimeout(() => {
        setLoginMessage(null)
      }, 5000)

      console.log(user)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )





      setUser(user)
      blogService.setToken(user.token)
      console.log(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setLoginMessage('bad credentials')
      setTimeout(() => {
        setLoginMessage(null)
      }, 5000)
    }




    console.log('out of handleLogin')
  }

  

  const addBlog =
    async (titleBlogToAdd, authorBlogToAdd, urlBlogToAdd) => {



      console.log('in addBlog')

      console.log(user)
      const blogToAdd = {
        title: titleBlogToAdd,
        author: authorBlogToAdd,
        url: urlBlogToAdd
      }

      const request = await blogService.addNewBlog(blogToAdd)

      setCreationMessage(request)
      setTimeout(() => {
        setCreationMessage(null)
      }, 5000)

      console.log('add new blog request', request.data)
      if (request.status === 201) {
        let tempBlogs = blogs
        tempBlogs = tempBlogs.concat(request.data)
        console.log(tempBlogs)
        setBlogs(tempBlogs)

      }

    }

  const logout = (event) => {
    console.log('before logout, stored user: ', window.localStorage.getItem('loggedBlogappUser'))
    console.log('logging out')
    const loggingOut = true
    setLoginMessage({ user, loggingOut })
    setTimeout(() => {
      setLoginMessage(null)
    }, 5000)
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')

    console.log('after logout: ', window.localStorage.removeItem('loggedBlogappUser'))
  }


  const incrementBlogLikesByOne = async (blogToIncreaseLikes) => {
    console.log('in increment in app.js')
    const response = await blogService.addLikeToBlog(blogToIncreaseLikes)
    console.log(response)
  }

  const removeBlog = async (blogToRemove) => {
    console.log('in remove blog')
    console.log(blogToRemove)
    const response = await blogService.removeBlogService(blogToRemove)
    console.log(response)

    if (response.status === 204) {
      console.log('deletion successful')
      let blogIndexToDelete = blogs.findIndex((blog) => {
        if (blog.id === blogToRemove.id) {
          return true
        }else{
          return false
        }
      })

      console.log(blogIndexToDelete)
      setBlogs(blogs.splice(blogIndexToDelete, 1))

    }
  }

  // page rendering
  const blogList = () => {
    return (
      <>
        <div>
          <h2>Blog List</h2>

          <div>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog => {
                return (
                  <Blog key={blog.id}
                    blog={blog}
                    incrementBlogLikesByOne={incrementBlogLikesByOne}
                    removeBlog={removeBlog}
                  />

                )
              }
              )}
          </div>

        </div>
      </>
    )
  }

  const loginForm = () => {
    return (
      <>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password:
            <input
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>



          <button type="submit">login</button>
        </form>
      </>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='Create new blog entry'>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    )
  }



  return (
    <div>
      <Notification
        creationMessage={creationMessage}
        loginMessage={loginMessage}
      />
      <h1>Blogs</h1>

      {user === null ?
        loginForm() :
        <>
          {currentUserLogout()}
          {blogForm()}
          {blogList()}
        </>

      }


    </div>
  )
}

export default App