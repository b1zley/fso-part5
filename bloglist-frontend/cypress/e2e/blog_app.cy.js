describe('template spec', () => {
  const addTestBlog = (title, author, url) => {
    cy.get('#createNewBlogEntryButton').click()
    cy.get('#titleInput').type(title)
    cy.get('#authorInput').type(author)
    cy.get('#urlInput').type(url)
    cy.get('#createBlogButton').click()
  }


  beforeEach(() => {

    //empty database of users and blogs
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')

    //create a test user with no blogs
    const userToCreate = {
      name: 'testName',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users', userToCreate)
    cy.visit('http://localhost:3000')

  })


  it('Login form is shown', () => {
    cy.contains('Blogs')
    cy.contains('login')
    cy.contains('password')

  })


  describe('Login', () => {


    it('succeeds with correct credentials', () => {
      cy.get('#usernameInput')
        .type('test')
      cy.get('#passwordInput')
        .type('test')

      cy.get('#loginButton')
        .click()

      cy.contains('logged in as testName')
      cy.get('#notification').should('have.css', 'color', 'rgb(0, 128, 0)')

    })

    it('fails with wrong credentials', () => {
      cy.get('#usernameInput')
        .type('BAD USERNAME')
      cy.get('#passwordInput')
        .type('BAD PASSWORD')

      cy.get('#loginButton')
        .click()

      cy.get('#notification').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('#notification').contains('wrong')


    })
  })

  describe('when logged in', () => {

    beforeEach(() => {

      //login user here

      const userToLogin = {
        username: 'test',
        password: 'test'
      }

      cy.request('POST', 'http://localhost:3003/api/login', userToLogin)
        .then(response => {
          localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', () => {
      cy.contains('Blog List')

      //number of .blog divs before
      cy.get('.blog')
        .should('have.length', 0)

      cy.get('#createNewBlogEntryButton')
        .click()

      cy.get('#titleInput')
        .type('testTitle')

      cy.get('#authorInput')
        .type('testAuthor')

      cy.get('#urlInput')
        .type('testUrl')


      cy.get('#createBlogButton')
        .click()

      //number of .blog divs after
      cy.get('.blog')
        .should('have.length', 1)

      cy.contains('testTitle')
      cy.contains('testAuthor')

    })

    it('A user can like a blog', () => {
      addTestBlog('testTitle', 'testAuthor', 'testUrl')
      cy.contains('testTitle testAuthor')
        .parent()
        .find('.blogViewButton')
        .click()
        .parent()
        .parent()
        .find('.blogLikeButton')
        .click()
        .click()
        .click()
        .parent()
        .contains('likes 3')

    })

    it('The user who created a blog can delete it', () => {
      addTestBlog('testTitle', 'testAuthor', 'testUrl')

      cy.get('.blog')
        .should('have.length', 1)

      cy.contains('testTitle testAuthor')
        .parent()
        .find('.blogViewButton')
        .click()
        .parent()
        .parent()
        .find('.blogRemoveButton')
        .click()

      cy.contains('testTitle testAuthor')
        .should('not.exist')


      cy.get('.blog')
        .should('have.length', 0)
    })

    it('The user who did not create a blog cannot see delete button', () => {
      addTestBlog('testTitle', 'testAuthor', 'testUrl')
      cy.contains('logout').click()

      //create a new test user with no blogs
      const userToCreate = {
        name: 'testName2',
        username: 'test2',
        password: 'test2'
      }
      cy.request('POST', 'http://localhost:3003/api/users', userToCreate)
      //login as new user
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'test2',
        password: 'test2'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })

      cy.get('.blogViewButton')
        .click()
        .parent()
        .contains('.blogRemoveButton')
        .should('not.exist')


    })

    it('blogs spontaneously reorder based on likes - highest first', () => {
      addTestBlog('testTitle', 'testAuthor', 'testUrl')
      cy.contains('testTitle testAuthor')
        .parent()
        .find('.blogViewButton')
        .click()
        .parent()
        .parent()
        .find('.blogLikeButton')
        .click()

      cy.visit('http://localhost:3000')
      addTestBlog('secondTitle', 'secondAuthor', 'secondUrl')

      cy.contains('testTitle testAuthor')
        .parent()
        .should('have.id', 'blogNumber0')

      cy.contains('secondTitle secondAuthor')
        .parent()
        .find('.blogViewButton')
        .click()
        .parent()
        .parent()
        .find('.blogLikeButton')
        .click()
        .click()

      cy.contains('testTitle testAuthor')
        .parent()
        .should('have.id', 'blogNumber1')

      cy.contains('secondTitle secondAuthor')
        .parent()
        .should('have.id', 'blogNumber0')


    })



  })
})