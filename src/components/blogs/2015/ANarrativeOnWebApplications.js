import React from 'react';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Blog from '../../Blog'

import { Link as RouterLink } from "react-router-dom";

const ANarrativeOnWebApplications = (props) => (
    <Blog>
    <Typography variant="h3">A Narrative on Web Servers</Typography>
        <Typography>
            While a subject-matter expert in web development could certainly offer a better account of the evolution of web technology,
            building this blog gave me a decent preview into the lucrative technologies of the industry.
            Here is my offbeat narrative on the evolution of "Modern Web Applications".
        </Typography>
        <br/>
        <br/>
        <Typography variant="h5">The Rise of the Static Web</Typography>
        <Typography>
            Looking for an easy solution for publishing content to the web?
            Static websites are the answer.
            HTML files typically reside on a machine's file-system ready to be "served" to clients.
            Special "Server" software assumes the responsibility of shipping these files (think nginx).
            Custom code isn't necessary for static HTML files.
            Traditionally, static sites still require managing machines however.
            Wouldn't it be great if we could deploy static content to the web without managing messy api servers?
            Thanks to the cloud computing services, this all becomes easier!
            Forgot about managing machines and configuring APIs.
            Upload those static pages to your favorite Cloud, and take a rest.
        </Typography>
        <br/>
        <Typography variant="h5">The Rise of Server-Side Rendering</Typography>
        <Typography>
            Along comes complex data, business logic, and the need for dynamically content.
            Server-Side Rendering (SSR) has come to the rescue.
            <i>We're now officially a web application folks</i>.
            Applications change with data, and traditional "server" software won't cut it.
            Database connectivity is now a necessity, and that means custom server code.
            Pages must be dynamically rendered to embed data <i>before</i> serving the final HTML page.
            Instead of "magical" server <i>software</i> we now write custom code using a "magical" server <i>framework</i>.
        </Typography>
        <br/>
        <Typography variant="h5">The Fall of Server-Side Rendering (SSR)</Typography>
        <Typography>
            Everything changed when browsers advanced... <br />
            JavaScript now allows browsers to make asynchronous calls to servers, without ever refreshing the full page.
            With SSR a browser will often perform a full page refresh when being served rendered html files.
            Rendering dynamic content is now a possibility on the client browser, not just the server!
            Servers can now be broken into two catagories: traditional static content managers and data APIs.
            SSR takes it's last bow...
        </Typography>
        <br/>
        <Typography variant="h5">The Rise of Client-Side Rendering</Typography>
        <Typography>
            Static pages make the return to center stage!
            JavaScript and HTML together are now capable of rendering dynamic content within the browser.
            Server software is back in action (hello nginx), and SSR frameworks are pushed aside.
            Client-Side Rendering (CSR) enables the evolution of server APIs (Application Programming Interfaces).
            Server APIs can focus on delivering just data (i.e. JSON) to clients instead of rending HTML.
            Web pages can now integrate with multiple API Servers to be served data from various sources, all while rendering content dynamically.
            See <Link href='https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS' target="_blank">Cross-Origin Resource Sharing</Link>,
            a means of integrating various data sources in the browser.
        </Typography>
        <br/>
        <Typography variant="h5">The Return of Server-Side Rendering?</Typography>
        <Typography>
            Browsers are doing some heavy lifting running all this JavaScript.
            Are you noticing long load times, slow web pages, and unresponsive interfaces?
            I sure am. Is JavaScript to blame?
            Since off-loading heavy rendering responsiblities, servers have shifted the strain to client frameworks.
            Will optimizations be enough?
            Or will the power of the Cloud give SSR the strength to return?
            <br />
            <img height='100%' src={process.env.PUBLIC_URL + '/images/ill-be-back.jpg'}></img>
            <br />
            <br />
            <b>We'll see...</b>
            <br />
            <br />
            Had enough? No? Check out my next post: <Link component={RouterLink} to="/blog/2015/MultiPageVsSinglePageApplications">Mutli-Page vs Single-Page Applications</Link>
        </Typography>
    </Blog>
);

export default ANarrativeOnWebApplications



