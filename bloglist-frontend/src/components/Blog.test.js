import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'



describe('<Blog />', () => {

    let container

    const blog = {
        author: 'testAuthor',
        title: 'testTitle',
        url: 'testUrl',
        likes: 10,
        user: { name: 'tits' }
    }
    const mockRemoveBlog = jest.fn()
    const mockIncrementLikesByOne = jest.fn()
    beforeEach(() => {

        container = render(<
            Blog
            blog={blog}
            removeBlog={mockRemoveBlog}
            incrementBlogLikesByOne={mockIncrementLikesByOne}
        />).container
    })


    test('renders author and title content', async () => {



        const foundBlog = container.querySelector('.blog')

        expect(foundBlog).toBeDefined()

        const authorElement = await screen.getByText(`${blog.title} ${blog.author}`)

        console.log(authorElement)

    })

    test('does not render url and likes by default', () => {


        const urlElement = screen.queryByText(`${blog.url}`)
        expect(urlElement).toBeNull()
        console.log(urlElement)

        const domUrlElement = container.querySelector('.blogUrl')
        expect(domUrlElement).toBeNull()

        const likesElement = screen.queryByText(`likes ${blog.Likes}`)
        expect(likesElement).toBeNull()

    })


    test('after show button pressed, render url and likes', async () => {
        const user = userEvent.setup()
        const showButtonElement = container.querySelector('.blogViewButton')
        expect(showButtonElement).not.toBeNull()

        let urlElement = container.querySelector('.blogUrl')
        expect(urlElement).toBeNull()

        let likesElement = container.querySelector('.blogLikes')
        expect(likesElement).toBeNull()

        let likesFromScreen = screen.queryByText(`likes ${blog.likes}`)
        console.log(likesFromScreen)
        expect(likesFromScreen).toBeNull()


        await user.click(showButtonElement)

        urlElement = container.querySelector('.blogUrl')
        expect(urlElement).not.toBeNull()

        likesElement = container.querySelector('.blogLikes')
        expect(likesElement).not.toBeNull()


        likesFromScreen = screen.queryByText(`likes ${blog.likes}`)
        console.log(likesFromScreen)
        expect(likesFromScreen).not.toBeNull()
    })

    test('after show button clicked, then 2x like button, like handler activated twice', async () => {


        const user = userEvent.setup()
        const showButtonElement = container.querySelector('.blogViewButton')
        expect(showButtonElement).not.toBeNull()


        await user.click(showButtonElement)

        const likeButtonElement = container.querySelector('.blogLikeButton')
        expect(likeButtonElement).not.toBeNull()


        expect(mockIncrementLikesByOne.mock.calls).toHaveLength(0)
        await user.click(likeButtonElement)
        expect(mockIncrementLikesByOne.mock.calls).toHaveLength(1)
        await user.click(likeButtonElement)
        expect(mockIncrementLikesByOne.mock.calls).toHaveLength(2)

    })






})

