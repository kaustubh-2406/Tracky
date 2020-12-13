# Tracky

## What is it?
This is a chrome extension that tracks your daily activities and help you organize your day. This can be used by person to manage and track their daily activities. \
_(However, it is not that good as of now. __Bug friendly, crappy looking__ are some of description that can be coined for this projects.)_

## How does it works? 
- This project has a background which has all the background pages and it basically listens to [chrome tab events](https://developer.chrome.com/docs/extensions/reference/tabs "Chrome api reference") and storing the data in chrome storage via [chrome storage api](https://developer.chrome.com/docs/extensions/reference/storage "chrome storage").
- The popup folder is the frontend of the project that used html, css and vanilla js.
- The popup communicates with background page by emitting request messages to chrome runtime which are then catched and responded by background page.
  
## Want to contribute?
- Clone the repo.
- Checkout coding train's amazing playlist on youtube [here](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6bL9VOMT65ahNEri9uqLWfS).It is a bit outdated but it is a great resource. It includes setting up and some additional materials
-  Or follow the guide given below -
  - go to chrome and paste chrome://extensions in url bar.
  - to the top right and make sure that developer mode is active.
  - now you can add tracky to chrome by clicking on load unpacked and selecting the location where you cloned the repo.
  - you now can start contributing. 
- __It can run on all browsers but it is recommended to run it in chrome only, as you might face some weird issues due to some difference in api's__
