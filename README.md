![main workflow](https://github.com/jbacon/portfolio-website/actions/workflows/main.yaml/badge.svg)

# Portfolio Website: [https://portfolio.joshbacon.name](https://portfolio.joshbacon.name)

This portfolio website/blog is built using React with Typescript and Material UI. It is hosted as a static-site on AWS S3 with CloudFront content delivery. This site uses multiple back-end services including: EmailJS, Auth0, and a custom GoLang API server (hosted via Google Cloud Run)

## Key Technologies Used:

- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
- [GoLang Back-End API](https://github.com/jbacon/api-joshbacon-name)
- [Material UI](https://mui.com/)
- [AWS S3 Static Site Hosting](https://aws.amazon.com/getting-started/hands-on/host-static-website/)
- [AWS CloudFront CDN](https://www.amazonaws.cn/en/cloudfront/)
- [Auth0 for Login](https://auth0.com/)
- [EmailJS](https://www.emailjs.com/)
- [PrismJS](https://prismjs.com/)
- [Prettier](https://prettier.io/docs/en/install.html)
- [GitHub Actions](https://github.com/features/actions)

### CI/CD

See [.github/actions/deploy/action.yml](.github/actions/deploy/action.yml)

### Build & Deploy Manually

```bash
docker run -i -t -v ${PWD}/:/app/ --workdir /app/ node:23-bookworm npm run-script build
aws s3 sync --delete ${PWD}/build/ s3://portfolio.joshbacon.name/
aws cloudfront create-invalidation --distribution-id='E2DH15J9LGHZU1' --paths='/*'
```
