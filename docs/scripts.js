let formIsOpen = false

function startListening() {
    let theInputElement = document.getElementById('input')
    theInputElement.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            addMessageFromUser()
        }
    })
}
let messages = []
let pause = false
let welcomeSent = false
startListening()

function getLinkHTML(text, url) {
    return `<a href="${url}">${text}</a>`
}

async function addMessageFromUser() {
    const usersMessage = document.getElementById('input').value
    if (usersMessage === '') {
        alert('Why would you send an empty message?')
    } else {
        let messagesDiv = document.getElementById('messages')
        messagesDiv.innerHTML = messagesDiv.innerHTML +
            `
                        <b>Du:</b><br>
                        ${usersMessage}
                        <p><br></p>
        `
        setTimeout(() => {
            var objDiv = document.getElementById("messages");
            objDiv.scrollTop = objDiv.scrollHeight;
        }, 100)

        document.getElementById('input').value = ''

        const clearedUserMessage = replaceAllConfusingCharactersInUserInput(usersMessage)
        const nlpURL = `http://fancy-chats.com/user/getResponse?clientId=1234&input=${clearedUserMessage}&languageCode=de`

        console.log(nlpURL)
        let response
        try {
            response = await fetch(encodeURI(nlpURL));
        } catch (error) {
            console.log(error.message)
            if (!pause) {
                const errorMessage = `Sorry. I'm chilling right now.`
                setTimeout(() => {
                    showResponseToTheUser(errorMessage)
                }, 4000)
                pause = true
                setTimeout(() => {
                    pause = false
                }, 2 * 60 * 1000)
            }
        }
        if (response.ok) {
            const pauseBeforeShowWriting = Math.round(Math.random() * (1000 - 900) + 900)
            setTimeout(() => {
                showAssistantIsTyping()
            }, pauseBeforeShowWriting)

            const result = await getResponseText(response)
            const psiFactor = (1 + result.length / 100)
            const waitingTime = psiFactor * Math.round(Math.random() * (2000 - 1600) + 1600)
            console.log(`waitingTime: ${waitingTime}`)
            setTimeout(() => {
                showResponseToTheUser(result)
            }, waitingTime)
        } else {
            alert("HTTP-Error: " + response.status);
        }
    }
}

function showWelcomeMessage() {
    let messagesDiv = document.getElementById('messages')

    messagesDiv.innerHTML = messagesDiv.innerHTML.replace(`Lucky Luke is writing......<p><br></p>`, '')

    messagesDiv.innerHTML = messagesDiv.innerHTML +
        `<div>
                <b>Maya:</b>
                <br>
            </div>
            Hi :)
            <p><br></p>`
    setTimeout(() => {
        var objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }, 100)

}

function showAssistantIsTyping() {
    let messagesDiv = document.getElementById('messages')
    messagesDiv.innerHTML = messagesDiv.innerHTML +
        `Lucky Luke is writing......<p><br></p>`
    setTimeout(() => {
        var objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }, 100)

}

function replaceAllConfusingCharactersInUserInput(input) {
    let cleared = input
    while (cleared.indexOf('?') !== -1 || cleared.indexOf('/') !== -1) {
        cleared = cleared
            .replace('?', '')
            .replace('/', '')
    }

    return cleared
}

async function getResponseText(response) {

    let json = await response.json();
    let text
    let link
    if (json.answer === undefined) {
        text = json.defaultResponses[0]
    } else {
        text = json.answer.split(`https://`)[0]
        link = json.answer.split(`https://`)[1]
    }
    const formattedAnswer = text;
    let result = (link === undefined) ? text : getLinkHTML(text, link)
    return result
}

async function showResponseToTheUser(result) {
    let messagesDiv = document.getElementById('messages')

    messagesDiv.innerHTML = messagesDiv.innerHTML.replace(`Lucky Luke is writing......<p><br></p>`, '') +
        `
                        <b>Maya:</b><br>
                        ${result}
                        <p><br></p>
        `

    setTimeout(() => {
        var objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }, 100)
}

function openClose() {
    if (formIsOpen) {
        closeForm()
    } else {
        openForm()
    }

}

function openForm() {
    console.log('opening chat window')
    const theForm = document.getElementById("myForm");
    theForm.style.zIndex = 1000000
    theForm.style.display = "block"
    const theClose = document.getElementById("myClose");
    theClose.style.zIndex = 1000001
    formIsOpen = true

    if (!welcomeSent) {
        const pauseBeforeShowWriting = Math.round(Math.random() * (1000 - 900) + 900)
        setTimeout(() => {
            showAssistantIsTyping()
        }, pauseBeforeShowWriting)

        setTimeout(() => {
            showWelcomeMessage()
        }, pauseBeforeShowWriting + 1000)

        welcomeSent = true
    }

}

function closeForm() {
    const theForm = document.getElementById("myForm");
    theForm.style.zIndex = -1000000
    theForm.style.display = "none";
    const theClose = document.getElementById("myClose");
    theClose.style.zIndex = -1000000
    formIsOpen = false
}

function shallChatWindowBeDisplayed() {
    if (true) {
        console.log("chat button will be displayed")
    } else {
        console.log("chat button will not displayed")
        const allOfIt = document.getElementById("allOfIt");
        allOfIt.style.display = "none";
        allOfIt.style.zIndex = -100000000000
    }
}
shallChatWindowBeDisplayed()

