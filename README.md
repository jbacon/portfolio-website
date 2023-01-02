[![Build Status](https://api.travis-ci.com/jbacon/portfolio-website.svg?branch=main)](https://api.travis-ci.com/jbacon/portfolio-website.svg?branch=main)

# Portfolio Website: [https://portfolio.joshbacon.name](https://portfolio.joshbacon.name)

My portfolio website/blog built using [Create React App](https://create-react-app.dev/) with Typescript and Material UI. This application is hosted as a static-site on [AWS S3 w/ CloudFront CDN](https://aws.amazon.com/getting-started/hands-on/host-static-website/). The only back-end service currently being integrated is EmailJS, with more to come!

## Key Technologies Used:

- ReactJS - [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
- [Material UI](https://mui.com/)
- AWS S3 Static Site Hosting
- AWS CloudFront CDN
- [Auth0](https://auth0.com/)
- [EmailJS](https://www.emailjs.com/)
- [PrismJS](https://prismjs.com/)
- [Prettier](https://prettier.io/docs/en/install.html)
- [Travis CI](https://app.travis-ci.com/)

### Build

```bash
docker run -i -t -v ${PWD}/:/app/ --workdir /app/ node:18-stretch npm run-script build
```
