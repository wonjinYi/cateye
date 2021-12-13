const showMessage = (text) => {
    const currentMsg = document.getElementById('serperbuy-message');
    if (currentMsg) { currentMsg.parentNode.removeChild(currentMsg); }

    let message = document.createElement('h2');
    message.setAttribute('id', 'serperbuy-message')
    message.style.position = 'absolute';
    message.style.left = '16px';
    message.style.bottom = '16px';
    message.style.padding = '16px';
    message.style.backgroundColor = '#FF625A';
    message.style.color = 'white';
    message.style.zIndex = '99';

    message.textContent = text;
    document.body.insertBefore(message, root);
    setTimeout(() => {
        try {
            message.parentNode.removeChild(message);
        } catch (err) {
            // ㅋㅋ 메시지어디갔누
        }
    }, 2000);
};

export { showMessage };