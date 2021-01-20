import React from 'react';
import { Typography } from '@material-ui/core';
import Blog from '../../Blog'
import Link from '@material-ui/core/Link';
import Highlight from "react-highlight.js"

const blog = (props) => (
    <Blog>
        <Typography variant="h2">How To Publish<br />React Components</Typography>
        <Typography>
        <br/>
        So you built a nifty component and want to share it with the world..<br/>
        or maybe just re-use it across projects. Either way, you need a good way to publish.<br/>
        Many 3rd party component packaging libraries do exist (see <Link href='https://bit.dev/' target="_blank">bit.dev</Link>);<br/>
        But this guide explores an simple strategy using NPM.<br/>
        <br/>
        Our Requirements:
        </Typography>
        <ul>
            <li>Dev Experience - Create React App</li>
            <li>Single Repo - Via GitHub</li>
            <li>Live Demo - GitHub Pages</li>
            <li>Tests - Jest</li>
            <li>CI/CD - Travis</li>
            <li>Hosting - NPM</li>
        </ul><br/>
        <Typography>
        These requirements will make our component a professional product.<br/>
        <br/>
        </Typography>
        <Typography variant="h4">Create React App</Typography>
        <Typography>
        Even though the component is not fully fledge application, we can still use CRA to provision our project to ramp up a live working demo.<br/>
        With that said, we need to tweak a few things:
        </Typography>
        <ul>
            <li>Dev Experience - Create React App</li>
            <li>Single Repo - Via GitHub</li>
            <li>Live Demo - GitHub Pages</li>
            <li>Tests - Jest</li>
            <li>CI/CD - Travis</li>
            <li>Hosting - NPM</li>
        </ul><br/>
        <Highlight>
{`func ListenAndServe(addr string, handler Handler) error`}
        </Highlight>
        <Typography variant="h4">Our Component</Typography>
        <Typography>
        Our server now needs to handle a database layer that is initialized in main:
        </Typography>
        <Highlight>
{`sqlClient, err := sql.Open("sqlite3", "./database.db")
if err != nil {
    log.Fatalf("Could not open db: %v", err)
}`}
        </Highlight>
        <Typography>
        This leaves us asking:<br/>
        </Typography>
        <ul>
            <li>How will our handlers access the database client?</li>
        </ul>
        <Typography>
        While <b>sqlClient</b> could be used globally, that would not be elegant.<br/>
        One solution is to create a wrapper around our <b>handlerFunc</b>. Like so...<br/>
        </Typography>
        <Highlight>
{`func helloWorld(sqlClient *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ... your logic ... 
    })
}`}
        </Highlight>
        <Typography>
        This neat treat exposes our <b>sqlClient</b> scope to our custom function inside <b>HandlerFunc</b>.<br/>
        We can now, re-write main:<br/>
        </Typography>
        <Highlight>
{`httpHandler := helloWorld(sqlClient)
http.ListenAndServe(":8080", httpHandler)`}
        </Highlight>
        <Typography>
        This wrapper technique also allows us to create nifty middleware.<br/>
        <br/>
        </Typography>
        <Typography variant="h3">Middleware</Typography>
        <Typography>
        Chaining middleware is a critical feature of any server routing solution.<br/>
        We can use the same wrapper design above, with slight modification.<br/>
        Instead of accepting a <b>sqlClient</b> input, middleware will accept another <b>http.Handler</b>.
        </Typography>
        <Highlight>
{`func middleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ...
    }
 }`}
        </Highlight>
        <br/>
        <Typography variant="h3">Logging</Typography>
        <Typography>
        Using middleware, we can now create a logging framework.<br/>
        </Typography>
        <Highlight>
{`func loggerMiddleware(next http.Handler) http.Handler { 
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("Request received")
		next.ServeHTTP(w, r)
		log.Println("Request handled")
    })
}`}
        </Highlight>
        <Typography>
        The key understanding here being <b>next.ServeHTTP</b>, which calls the inner handler.<br/>
        We can use our new logging middleware like so:
        </Typography>
        <Highlight>
{`handler := loggingMiddleware(helloWorld(sqlClient)))
http.ListenAndServe(":8080", handler)`}
        </Highlight>
        <Typography>
        Now.. it's a chain.<br/><br/>

        To view the full source for this demonstration, visit my <Link href='https://github.com/jbacon/api-joshbacon-name' target="_blank">GitHub Repo</Link>.<br/><br/>

        I hope this article was helpful.<br/>
        GoLang is a nifty language for building both simple and complex http servers.
        </Typography>
    </Blog>
);
export default blog