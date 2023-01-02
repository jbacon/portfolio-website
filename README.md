![main workflow](https://github.com/jbacon/portfolio-website/actions/workflows/main.yaml/badge.svg)

# Portfolio Website: [https://portfolio.joshbacon.name](https://portfolio.joshbacon.name)

My portfolio website/blog built using React with Typescript and Material UI. This application is hosted as a static-site on AWS S3 with CloudFront content delivery. The only back-end services currently being integrated are EmailJS and Auth0, with more to come.

## Key Technologies Used:

- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
- [Material UI](https://mui.com/)
- [AWS S3 Static Site Hosting](https://aws.amazon.com/getting-started/hands-on/host-static-website/)
- [AWS CloudFront CDN](https://www.amazonaws.cn/en/cloudfront/)
- [Auth0](https://auth0.com/)
- [EmailJS](https://www.emailjs.com/)
- [PrismJS](https://prismjs.com/)
- [Prettier](https://prettier.io/docs/en/install.html)
- [GitHub Actions](https://github.com/features/actions)

### Build

```bash
docker run -i -t -v ${PWD}/:/app/ --workdir /app/ node:18-stretch npm run-script build
```
