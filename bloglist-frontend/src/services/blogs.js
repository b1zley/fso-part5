import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const addNewBlog = async (newBlog) => {

  const config = {
    headers: { Authorization: token }
  }

  const request =
    await
      axios.post(baseUrl, newBlog, config)
  return (request)

}

const addLikeToBlog = async (blogToIncreaseLikes) => {
  blogToIncreaseLikes.likes = blogToIncreaseLikes.likes + 1

  const blogId = blogToIncreaseLikes.id
  console.log('blogservices', blogToIncreaseLikes)
  
  const url = `${baseUrl}/${blogId}`
  


  const request =
    await
      axios.put(url, blogToIncreaseLikes)
      
  return(request.data)


}

const removeBlogService = async (blogToDelete) => {

  // make sure blog passed has id accessible
  //need to finish implementation of button

  const config = {
    headers: { Authorization: token }
  }

  const blogToDeleteId = blogToDelete.id

  const urlToDelete =
    `${baseUrl}/${blogToDeleteId}`

  const request =
    await
      axios.delete(urlToDelete, config)

  return request


}





// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, addNewBlog , addLikeToBlog , removeBlogService }