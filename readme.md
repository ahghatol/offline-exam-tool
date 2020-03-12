
# Build
## prerequisite
- Node version `v8.17.0`

## Setup content download proxy node app
- Command: `cd zip-download-proxy && npm install`
- Open the server.js replace tag `{{API_KEY_HERE}}` with API KEY
- Start app command : `node server.js`

## Setup node app to get the content body
- command: `cd quiz-body && npm install`

## Steup download-webpage
- Open index.html,
- find http://localhost:`8071` repace this port with the port **download proxy** node app port
- Open the index.html in browser
- Download the content, extract it
- Go to `content**/do_**/
- Extract *.zip
- Go to extracted folder and copy all files
- Paste the copied files to `quiz-body/content/`

## Setup Content player
- Paste this content player files in web server
- command: `cd content-player && npm install`
- Open the `index.html`, find http://localhost:`8000` and replace this port with **content body** node app port and
- Open the index.html in browser


