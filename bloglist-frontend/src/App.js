import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
//import loginService
import loginService from './services/login'

//import notification
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])

  //user information
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // blogToAdd information
  const [titleBlogToAdd, setTitleBlogToAdd] = useState('')
  const [authorBlogToAdd, setAuthorBlogToAdd] = useState('')
  const [urlBlogToAdd, setUrlBlogToAdd] = useState('')


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

  const addBlog = async (event) => {



    console.log('in addBlog')
    event.preventDefault()

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

    console.log(request)
    if (request.status === 201) {
      let tempBlogs = blogs
      tempBlogs = tempBlogs.concat(request.data)
      setBlogs(tempBlogs)
      setTitleBlogToAdd('')
      setAuthorBlogToAdd('')
      setUrlBlogToAdd('')
    }

  }

  const logout = (event) => {
    console.log('before logout, stored user: ', window.localStorage.getItem('loggedBlogappUser'))
    console.log('logging out')
    const loggingOut = true
    setLoginMessage({user, loggingOut})
    setTimeout(() => {
      setLoginMessage(null)
    }, 5000)
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')

    console.log('after logout: ', window.localStorage.removeItem('loggedBlogappUser'))
  }

  // page rendering
  const blogList = () => {
    return (
      <>
        <div>
          <h2>Blog List</h2>
          {currentUserLogout()}
          <div>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
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
      <>
        <div>
          <h2>Create New</h2>
          <form onSubmit={addBlog}>
            <div> title:
              <input
                type="text"
                value={titleBlogToAdd}
                name="Title"
                onChange={({ target }) => setTitleBlogToAdd(target.value)}
              />
            </div>
            <div>
              author:
              <input
                type="text"
                value={authorBlogToAdd}
                name="Author"
                onChange={({ target }) => setAuthorBlogToAdd(target.value)}
              />
            </div>
            <div>
              url:
              <input
                type="text"
                value={urlBlogToAdd}
                name="Author"
                onChange={({ target }) => setUrlBlogToAdd(target.value)}
              />
            </div>
            <button type="submit">create</button>
          </form>
        </div>
      </>
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

        (
          <>

            {blogForm()}
            {blogList()}
          </>
        )

      }


    </div>
  )
}

export default App