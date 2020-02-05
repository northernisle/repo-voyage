# Repo Voyage
Yet another simple, currently under development, GitHub repository cruise used to sharpen one's skills.  
Developed using React, Redux, SCSS with CSS modules on the side.
Testing comes with Jest and React Testing Library, to whom Cypress will tag along in the future.

### Running the application
The only thing you really need is `npm install`.


### Available commands

| Command               | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| `npm start`           | stars the application on WDS in development                       |
| `npm run start:prod`  | starts the application on WDS in production                       |
| `npm test`            | runs the test suites with Jest                                    |
| `npm run build`       | compiles the application into a `dist` folder in production mode*  |

*In order to run the application from a file you'll need to set the environment variable `LOCAL` to `true`.

### Authentication
Authentication is implemented using OAuth as a proof-of-concept. It should NOT be used in a real scenario because the
`client_secret` is visible both in the application's runtime and in the request's body. Since this flow is usually implemented
in pair with a back-end server, and this is a pure front-end project, a [third-party intermidiate server](https://cors-anywhere.herokuapp.com/)
is used to reroute the request to GitHub. You'll have to supply your own tokens to enable authentication in the project.
Also, keep in mind that authentication is not available if the project is run from a local file.

#### Obtaining the tokens from GitHub
1. [Register a new OAuth app](https://github.com/settings/applications/new).
2. In `Homepage URL` input `http://localhost:3000/`.
3. In `Authorization callback URL` input `http://localhost:3000/auth`.
4. Save `Client ID` and `Client Secret`.

#### Setting up the application
Using the tokens you previously obtained, you'll need to create `.env` file in the root of the project next to all the 
configuration files and create the following environment variables:

| Environment Variable  | Description                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------- |
| `CLIENT_ID`           | the `client_id` GitHub gave you                                                             |
| `CLIENT_SECRET`       | the `client_secret` GitHub gave you                                                         |
| `BASE_URL`            | the url the application is running from. Use `http://localhost:3000` as a default           |
| `LOCAL`               | `true` or `false` indicating wether you're runnign the application from a local file or WDS |
