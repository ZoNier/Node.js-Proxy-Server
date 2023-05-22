# Node.js-Proxy-Server
This is a simple Node.js proxy server that allows you to proxy requests to a specified target URL while restricting access to specific domains.
## Configuration

To customize the proxy server, you can modify the following variables at the top of the script:

- `ProxyTarget`: The URL of the resource you want to proxy.
- `ProxyAllowDomain`: An array of allowed domain URLs.
- `ProxyPort`: The port on which the proxy server will run.

Make sure to set these variables according to your requirements.

## Prerequisites

Before running the proxy server, make sure you have the following prerequisites installed:

- Node.js

## Installation

1. Clone this repository or download the script file.
```bash
git clone https://github.com/ZoNier/Node.js-Proxy-Server.git
```
2. Install the dependencies by running the following command in the project directory:
```bash
cd Node.js-Proxy-Server
npm install
```
## Usage
To start the proxy server, run the following command:
```bash
npm start
```
The server will start running on the specified port, and requests will be proxied to the target URL. Only requests from the allowed domains will be allowed.

To stop the server, press `Ctrl + C` in the terminal.

## Error Handling
If there is an error connecting to the target URL (e.g., connection refused), the server will retry after a delay of 5 seconds. If the error persists, a 500 Internal Server Error response will be sent.

## License
This project is licensed under the [MIT License](LICENSE).
