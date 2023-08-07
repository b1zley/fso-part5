import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
//import loginService
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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




  const addBlog = async (event) => {
    //implement later
  }

  const logout = (event) => {
    console.log('before logout, stored user: ', window.localStorage.getItem('loggedBlogappUser'))
    console.log('logging out')
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    console.log('after logout: ', window.localStorage.removeItem('loggedBlogappUser'))
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

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )





      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      alert('Whoops! Wrong credentials')
      //adjust this code to use error messages -- as soon as we actually make code for error messages
    }




    console.log('out of handleLogin')
  }


  const loginForm = () => {
    return (
      <>
        <h2>login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
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
        <form onSubmit={addBlog}>

        </form>

      </>
    )
  }

  const blogList = () => {
    return (
      <>
        <div>
          <h2>blogs</h2>
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

  return (
    <div>

      {user === null ?
        loginForm() :
        blogList()

      }


    </div>
  )
}

export default App