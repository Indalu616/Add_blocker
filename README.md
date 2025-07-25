BlockRight: A Modern Ad-Blocking Chrome Extension
A high-performance, modern ad-blocking extension built with React and Material-UI, leveraging the latest Chrome Manifest V3 APIs for a fast, reliable, and clean Browse experience.


About The Project
This project was developed to create a robust and user-friendly ad blocker from the ground up. It uses Chrome's powerful Declarative Net Request API for maximum performance, ensuring that ad-blocking happens natively without slowing down your browser. The user interface is a sleek, dark-themed popup built with React and Material-UI, providing statistics and per-site controls.

Features
High-Performance Blocking: Built on Manifest V3 and the Declarative Net Request API for efficient, native ad-blocking.

Modern UI: A beautiful and responsive popup menu built with React and Material-UI, featuring a dark theme.

Per-Site Whitelisting: Easily disable ad-blocking on your favorite websites with a single toggle switch in the popup.

Live Stats: View the total number of ads blocked since installation.

Real-Time Badge Counter: The extension icon shows a live count of ads blocked on the current page.

Comprehensive Blocklist: Comes pre-loaded with an expanded list of common ad and tracker domains.

Built With
This project leverages a modern web development stack:

React

Material-UI (MUI)

Chrome Extension APIs (Manifest V3)

JavaScript (ES6+)

Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
You need to have Node.js and npm installed on your machine.

npm

Bash

npm install npm@latest -g
Installation and Setup
Clone the repository

Bash

git clone https://github.com/Indalu616/Add_blocker

Navigate to the project directory

Bash

cd Add_blocker 
Install NPM packages

Bash

npm install
Build the project for production

Bash

npm run build
This will create a build folder in your project directory, which contains the complete, optimized extension.

Loading the Extension in Chrome
Open your Google Chrome browser and navigate to chrome://extensions.

Enable "Developer mode" using the toggle switch in the top-right corner.

Click the "Load unpacked" button that appears on the top-left.

In the file selection dialog, select the build folder from your project's directory.

The BlockRight extension should now appear in your list of extensions and be active!

Usage
Pin the Extension: For easy access, click the puzzle piece (🧩) icon in your Chrome toolbar and then click the pin (📌) icon next to BlockRight.

View Stats: Click the extension icon in your toolbar to open the popup and see your blocking statistics.

Whitelist a Site: While on a website you wish to support, open the popup and use the toggle switch to allow ads on that specific domain.

See Page-Specific Blocks: The badge on the extension icon will automatically update to show you how many ad requests were blocked on the page you are currently viewing.

Roadmap
See the open issues for a list of proposed features (and known issues). Future enhancements could include:

[ ] Automatic blocklist updates from sources like EasyList.

[ ] Cosmetic filtering to hide empty spaces left by blocked ads.

[ ] More detailed statistics and data visualizations.

[ ] User-defined custom blocking rules.

Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

License
Distributed under the MIT License. See LICENSE file for more information.
