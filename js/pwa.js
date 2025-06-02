// PWA installation and update management
document.addEventListener('DOMContentLoaded', () => {
    // Register the service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    
                    // Check for service worker updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        console.log('Service worker update found!');
                        
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                showUpdateNotification();
                            }
                        });
                    });
                })
                .catch(error => {
                    console.error('ServiceWorker registration failed: ', error);
                });
                
            // Handle updates when the user comes back to the app
            let refreshing = false;
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (!refreshing) {
                    refreshing = true;
                    window.location.reload();
                }
            });
        });
    }

    // Create and show install button if the app is installable
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later
        const deferredPrompt = e;
        
        // Create a simple install button at the top of the app
        const installContainer = document.createElement('div');
        installContainer.className = 'install-container';
        
        const installButton = document.createElement('button');
        installButton.innerHTML = '<i class="fas fa-download"></i> Install App on Device';
        installButton.className = 'install-button';
        
        installContainer.appendChild(installButton);
        
        // Insert after the header
        const header = document.querySelector('header');
        header.parentNode.insertBefore(installContainer, header.nextSibling);
        
        // Show the install button
        installContainer.style.display = 'flex';
        
        // Add click event to install the app
        installButton.addEventListener('click', () => {
            // Show the install prompt
            deferredPrompt.prompt();
            
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                    installContainer.style.display = 'none';
                } else {
                    console.log('User dismissed the install prompt');
                }
            });
        });
    });
});

// Function to show a notification when app update is available
function showUpdateNotification() {
    const updateContainer = document.createElement('div');
    updateContainer.className = 'update-container';
    updateContainer.innerHTML = `
        <div class="update-notification">
            <p>New version available!</p>
            <button id="update-button">Update Now</button>
        </div>
    `;
    
    document.body.appendChild(updateContainer);
    
    document.getElementById('update-button').addEventListener('click', () => {
        // Tell the service worker to skipWaiting
        navigator.serviceWorker.getRegistration().then(reg => {
            if (reg.waiting) {
                reg.waiting.postMessage({ action: 'skipWaiting' });
            }
        });
        
        updateContainer.style.display = 'none';
    });
}
