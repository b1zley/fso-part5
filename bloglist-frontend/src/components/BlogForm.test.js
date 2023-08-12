import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm.js'


describe('<BlogForm />', () => {
    const mockAddBlog = jest.fn()

    let container

    beforeEach(() => {

        container = render(
            <BlogForm
                addBlog={mockAddBlog}
            />
        ).container
    })

    test('BlogForm renders', () => {
        const formDiv = container.querySelector('.formDiv')
        expect(formDiv).not.toBeNull()
    })


    test('when form filled out and submit clicked - event handler activated with correct values passed', async () => {
        const user = userEvent.setup()

        const titleInput =
            screen.getByPlaceholderText('write title here')
        expect(titleInput).not.toBeNull()

        const authorInput =
            screen.getByPlaceholderText('write author here')
        expect(authorInput).not.toBeNull()

        const urlInput =
            screen.getByPlaceholderText('write url here')
        expect(urlInput).not.toBeNull()

        const createButton = screen.getByText('create')

        const titleToPass = 'testTitle'
        const authorToPass = 'testAuthor'
        const urlToPass = 'testUrl'

        await userEvent.type(titleInput, titleToPass)
        await userEvent.type(authorInput, authorToPass)
        await userEvent.type(urlInput, urlToPass)

        await userEvent.click(createButton)

        //mockAddBlog

        expect(mockAddBlog.mock.calls).toHaveLength(1)


        expect(mockAddBlog.mock.calls[0][0]).toBe('testTitle')
        expect(mockAddBlog.mock.calls[0][1]).toBe('testAuthor')
        expect(mockAddBlog.mock.calls[0][2]).toBe('testUrl')




    })


})