# Tracky

## What is it?
This is a chrome extension that tracks your daily activities and help you organize your day. This can be used by person to manage and track their daily activities.

## How does it works?
- This project has a backend folder which has all the code related to chrome apis and it basically listens to chrome tab events and stores the data in chrome storage.
- The popup folder is the frontend of the project that used html, css and javascript to show the UI of the extension.
- The popup communicates with background page by emitting request messages to chrome runtime which are then responded by background page.
- Chrome apis used in making this work are as follows
  - [chrome storage api](https://developer.chrome.com/docs/extension/reference/storage "chrome api reference")
  - [chrome tabs api](https://developer.chrome.com/docs/extension/reference/tabs "chrome api reference")

If you are interested in extending the capabilities of chrome and want to build your own chrome/browser extension you must watch videos of Coding Train on the same topic. [Link](https://youtube.com/playlist?list=PLRqwX-V7Uu6bL9VOMT65ahNEri9uqlwfS "playlist of coding train")