const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // stores the events
    window.deferredPrompt = event;
    // removes the hidden class from the button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // gets stored events
    const promptEvent = window.deferredPrompt;
    // if nothing is stored, nothing happens
    if (!promptEvent) {
        return;
    }
    // shows prompt
    promptEvent.prompt();
    // resets the deferred prompt variable
    window.deferredPrompt = null;
    // removes hidden class from the button
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // clears the prompt
    window.deferredPrompt = null;
});
