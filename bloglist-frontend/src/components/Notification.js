

const Notification = ({ creationMessage, loginMessage }) => {
    let textToReturn
    let isError


    if (creationMessage && creationMessage.status === 201) {
        let blogTitle = creationMessage.data.title
        let blogAuthor = creationMessage.data.author
        isError = false
        console.log(blogTitle)
        console.log(blogAuthor)
        textToReturn = `A new blog ${blogTitle} by ${blogAuthor} added`

    } else if (creationMessage) {
        textToReturn = 'Blog not added'
        isError = true
    } else if (loginMessage && loginMessage.loggingOut === true) {
        textToReturn = `logged out`
        isError = false
    } else if (loginMessage && loginMessage === 'bad credentials') {
        textToReturn = 'wrong username or password'
        isError = true

    } else if (loginMessage) {
        let username = loginMessage.username
        let name = loginMessage.name
        isError = false
        textToReturn = `Successfully logged in as ${name}`

    } else {
        isError = false
        textToReturn = 'No message'
    }


    const notificationStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 20,

        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const errorStyle = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 20,

        background: 'lightgrey',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    let style
    if (isError === false) {
        style = notificationStyle
    } else {
        style = errorStyle
    }

    if(!creationMessage && !loginMessage){
        return(null)
    }


    return (
        <div style={style}>
            {textToReturn}
        </div>

    )



}

export default Notification