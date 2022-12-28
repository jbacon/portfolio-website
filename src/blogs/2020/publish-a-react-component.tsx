import React from "react";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Highlight from "../../components/Highlight";

const blog = () => (
  <React.Fragment>
    <Typography variant="h2">
      How To Publish
      <br />
      React Components
    </Typography>
    <Typography>
      <br />
      So you built a nifty component and want to share it with the world..
      <br />
      or maybe re-use across projects. Either way, you need a efficient means of
      publication.
      <br />
      Many 3rd party solutions do exist (see{" "}
      <Link href="https://bit.dev/" target="_blank">
        bit.dev
      </Link>
      ); but this guide explores an simple strategy using NPM.
      <br />
      <br />
      In this tutorial we will walk through project configurations for hosting a
      single component, and here are our requirements:
    </Typography>
    <ul>
      <li>Good Dev Experience: Create React App</li>
      <li>Single Repo: Via GitHub</li>
      <li>Live Working Demo: GitHub Pages</li>
      <li>Tests: Jest</li>
      <li>CI/CD: Travis</li>
      <li>Public Hosting: NPM</li>
    </ul>
    <br />
    <Typography variant="h4">Create React App</Typography>
    <Typography>
      Even though the component is not a fully fledge app, we still use CRA to
      provision our project, which ramps up a live working demo.
      <br />
    </Typography>
    <Highlight
      language="bash"
      content={`npm install -g create-react-app
npx create-react-app my-app
cd my-app
npm start`}
    />
    <Typography>
      The default project will need minor tweaks..
      <br />
      <br />
      First, add the following to <b>package.json</b>
    </Typography>
    <Highlight
      language="json"
      content={`"main": "build-component/index.js",
"module": "build-component/index.js",
"private": false,
"homepage": ".",
"publishConfig": {
    "access": "public"
},
"repository": {
    "type": "git",
    "url": "https://github.com/jbacon/react-component-progress-indicator"
}`}
    />
    <Typography>
      Replacing <b>repository.url</b> with your projects repo.
      <br />
      <br />
      Also inside <b>package.json</b>, add a new <b>script</b> called{" "}
      <b>build-component</b> containing the following command:
      <br />
    </Typography>
    <Highlight
      language="bash"
      content={`NODE_ENV=production && \
rm -rf build-component && \
mkdir build-component && \
npx babel src/Component --out-dir build-component --copy-files`}
    />
    <Typography>
      This build command requires us to install a new babel dependency, which is
      not included with CRA by default.
    </Typography>
    <Highlight language="bash" content={`npm install --save-dev @babel/cli`} />
    <Typography>
      <br />
      Next, add the line <b>&quot;/build-component&quot;</b> to the{" "}
      <b>.gitignore</b> file.
      <br />
      Then, make a new file <b>.npmignore</b> with contents copied from{" "}
      <b>.gitignore</b>.<br />
      Append these additional lines inside <b>.npmignore</b>:<br />
    </Typography>
    <Highlight
      language="markdown"
      content={`## Additioanl lines for npmignore
/public/
/src/
.travis.yml
.eslintcache
README.md
/build
!/build-component`}
    />
    <Typography>
      This step reduces the package size of our component on NPM. Our package
      should only include the <b>/build-component</b> folder.
      <br />
      However, we can further reduce package size by examining our default CRA
      dependencies.
      <br />
      Some CRA dependencies are unnecessary for our component package.
      <br />
      Move all dependencies <b>except &quot;react&quot;</b> from{" "}
      <b>package.json/dependencies</b> to <b>package.json/devDependencies</b>.
      This allows us to release a small production package for our component,
      while maintaining the ability to develop our demo app.
      <br />
      <br />
      We&apos;re all done setting up our CRA application, and are ready to start
      developing.
      <br />
    </Typography>
    <br />
    <Typography variant="h4">Our Component</Typography>
    <Typography>
      Our component will be a simple grey background overly.
      <br />
      Create a new file <b>&quot;src/Component/index.js&quot;</b> and paste the
      following code:
    </Typography>
    <Highlight
      language="jsx"
      content={`import React from 'react';

const BackgroundGrey = (props) => (
    <div style={{ backgroundColor: "grey" }}>{props.children}</div>
)

export default BackgroundGrey`}
    />
    <Typography>
      Now in <b>App.js</b>, we write code to demonstration our new component.
    </Typography>
    <Highlight
      language="jsx"
      content={`import logo from './logo.svg';
import './App.css';
import BackgroundGrey from "./Component"

function App() {
  return (
    <BackgroundGrey>
        <p>Hello World</p>
    </BackgroundGrey>
  );
}

export default App;`}
    />
    <Typography>
      We must also fix the default tests in <b>App.test.js</b>, like so...
    </Typography>
    <Highlight
      language="jsx"
      content={`import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello World/i);
  expect(linkElement).toBeInTheDocument();
});`}
    />
    <Typography>Our component is now ready to test and run.</Typography>
    <Highlight
      language="bash"
      content={`npm install;
npm run test;
npm run start;`}
    />
    <br />
    <Typography variant="h4">CI/CD: Travis</Typography>
    <Typography>
      Deployment of any production code needs to start with CI/CD. For this
      guide I will assume your project is hosted via GitHub and integrated with
      Travis. Travis will package, test, and deploy to NPM. GitHub Pages will
      host our demonstration code into a live working site, which can be added
      to the README for instructional purposes. <br />
      <br />
      All this can be accomplished with the follow <b>.travis.yml</b> file
    </Typography>
    <Highlight
      language="yaml"
      content={`language: bash
sudo: required
dist: trusty
services:
- docker
git:
  depth: 1
  submodules: false
branches:
  only:
  - main
cache:
  directories:
  - node_modules
env:
  global:
  - PATH=$HOME/.local/bin:$PATH
  - CI=true
before_install:
- echo "Before Install..."
install:
- docker run -e CI=true -i -t -v \${PWD}/:/app/ --workdir /app/ node:14-stretch npm install
before_script:
- docker run -e CI=true -i -t -v \${PWD}/:/app/ --workdir /app/ node:14-stretch npm test -- --coverage
script:
- docker run -e CI=true -i -t -v \${PWD}/:/app/ --workdir /app/ node:14-stretch npm run-script build
- docker run -e CI=true -i -t -v \${PWD}/:/app/ --workdir /app/ node:14-stretch npm run-script build-component
after_script:
- echo "After Script..."
before_cache:
- echo "Before Cache..."
after_success:
- echo "After Success..."
after_failure:
- echo "After Failure..."
before_deploy:
- echo "Before Deploy..."
deploy:
  - provider: script
    script: docker run -e CI=true -e NPM_TOKEN="\${NPM_TOKEN}" -i -t -v \${PWD}/:/app/ --workdir /app/ node:14-stretch bash -c 'npm config set "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" && npm publish'
    on:
      branch: main
    skip_cleanup: true
  - provider: pages
    local_dir: \${PWD}/build/
    skip_cleanup: true
    github_token: $GITHUB_TOKEN  # Set in the settings page of your repository, as a secure variable
    keep_history: true
    on:
      branch: main
after_deploy:
  - echo "After Deploy..."`}
    />
    <Typography>
      Key features to highlight include the usage of two <b>deploy</b> commands,
      one for NPM and one for GitHub Pages. Also the usage of two build{" "}
      <b>script</b>. Also notable, is our usage of <b>docker</b>, which allows
      us to ensure a consistent build environment for our source. Variables must
      be set in your CI/CD environment for: <b>NPM_TOKEN</b> and <b></b>
      <br />
    </Typography>
    <br />
    <Typography variant="h4">Publish to NPM</Typography>
    <Typography>
      Once you&apos;re ready to publish, simply merge your dev/feature branch
      into the <b>main</b> branch. Travis will kick off a build and deploy. And
      you can check your configured NPM registry.
      <br />
      <br />
    </Typography>
    <Typography variant="h4">That&apos;s All!</Typography>
    <Typography>
      Hope this has been helpful! If you have many related components, you can
      include them into this same package.
      <br />
      However you may also want to consider adapting a more scalable enterprise
      strategy using 3rd party component libraries:{" "}
      <Link href="https://bit.dev/" target="_blank">
        bit.dev
      </Link>
      <br />
      To see a live example component, visit my github here:{" "}
      <Link
        href=">https://github.com/jbacon/react-component-progress-indicator"
        target="_blank"
      >
        React Progress Indicator
      </Link>
      .<br />
    </Typography>
  </React.Fragment>
);
export default blog;
