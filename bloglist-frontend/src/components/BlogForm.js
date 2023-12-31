import { useState } from 'react'


// be sure to move 'prevent default' from
//app to new function here
//reorderBlogsBasedOnLikes = {reorderBlogsBasedOnLikes}



const BlogForm = ({ addBlog , reorderBlogsBasedOnLikes }) => {
    const [titleBlogToAdd, setTitleBlogToAdd] = useState('')
    const [authorBlogToAdd, setAuthorBlogToAdd] = useState('')
    const [urlBlogToAdd, setUrlBlogToAdd] = useState('')

    const addNewBlog = (event) => {
        console.log('in add new blog')

        event.preventDefault()
        addBlog(titleBlogToAdd,
            authorBlogToAdd,
            urlBlogToAdd)


        setTitleBlogToAdd('')
        setAuthorBlogToAdd('')
        setUrlBlogToAdd('')

        




    }

    return (
        <>
            <div className="formDiv">
                <h2>Create New</h2>
                <form onSubmit={addNewBlog}>
                    <div> title:
                        <input
                            type="text"
                            value={titleBlogToAdd}
                            name="Title"
                            id="titleInput"
                            placeholder='write title here'
                            onChange={({ target }) => setTitleBlogToAdd(target.value)}
                        />
                    </div>
                    <div>
                        author:
                        <input
                            type="text"
                            value={authorBlogToAdd}
                            name="Author"
                            id="authorInput"
                            placeholder='write author here'
                            onChange={({ target }) => setAuthorBlogToAdd(target.value)}
                        />
                    </div>
                    <div>
                        url:
                        <input
                            type="text"
                            value={urlBlogToAdd}
                            name="url"
                            id="urlInput"
                            placeholder='write url here'
                            onChange={({ target }) => setUrlBlogToAdd(target.value)}
                        />
                    </div>
                    <button 
                    type="submit"
                    id="createBlogButton"
                    >create</button>
                </form>
            </div>
        </>
    )






}

export default BlogForm