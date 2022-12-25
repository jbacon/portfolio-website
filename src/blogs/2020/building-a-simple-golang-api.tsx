import React from 'react';
import { Typography } from '@mui/material';
import Highlight from "../../components/Highlight"
import Link from '@mui/material/Link';

const blog = () => (
    <React.Fragment>
        <Typography variant="h2">GoLang Servers:<br />A Basic Demo</Typography>
        <Typography>
        <br/>
        This post covers a few basic techniques:<br/>
        </Typography>
        <ul>
            <li>Handlers</li>
            <li>Databases</li>
            <li>Middleware</li>
            <li>Logging</li>
        </ul><br/>
        <Typography>
        Let's start by building a dead simple GoLang HTTP Server<br />
        We will not use any 3rd party libraries in this demonstration.<br/>
        </Typography>
        <Highlight language="go" content={`package main

import (
    "fmt"
    "net/http"
)

func helloWorld(responseWriter http.ResponseWriter, request *http.Request) {
    response := []byte("Hello World")
    responseWriter.Write(response)
}

func main() {
    http.HandleFunc("/hello-world", helloWorld)
    http.ListenAndServe(":8080", nil)
}`}/>
        <Typography>
        Done. Pretty easy eh!? Let's break it down...<br/><br/>
        </Typography>
        <Typography variant="h4">Handlers</Typography>
        <Typography>
        The starting point of our demonstration is <b>http.ListenAndServe</b>.<br/>
        </Typography>
        <Highlight language="go" content={`func ListenAndServe(addr string, handler Handler) error`}/>
        <Typography>
        Notice our original code only passes <b>nil</b>, and not a <b>Handler</b>.<br/>
        We might expect <b>http.HandleFunc</b> to return our desired <b>http.Handler</b>.<br/>
        However, <b>http.HandleFunc</b> actually adds our Handler to a shared context automatically: <b>http.DefaultServeMux</b>.<br/>
        The <b>Server</b> is sharing this same context, which explains our <b>nil</b>.<br/>
        In GoLang a <b>http.ServeMux</b> is a <b>http.Handler</b> with additional responsibilities as a "request multiplexer".<br/>
        To illustrate, we create a different mux (handler) like so:<br/>
        </Typography>
        <Highlight language="go" content={`serveMux := http.NewServeMux()
serveMux.HandleFunc("/hello-world", helloWorld)
http.ListenAndServe(":8080", serveMux)`} />
        <Typography>
        We could also pass the handler directly, if we so choose:
        </Typography>
        <Highlight language="go" content={`serveMux := http.NewServeMux()
handler := serveMux.HandleFunc("/hello-world", helloWorld)
http.ListenAndServe(":8080", handler)`} />
        <Typography>
        Moving along to our function.. we must pay special attention to out signature.
        </Typography>
        <Highlight language="go" content={`func helloWorld(responseWriter http.ResponseWriter, request *http.Request) { ... }`}/>
        <Typography>
        This implements the proper input type for <b>handleFunc</b>.
        So far, this is a very basic server.... let's add more functionality.<br/><br/>
        </Typography>
        <Typography variant="h4">Database Clients</Typography>
        <Typography>
        Our server now needs to handle a database layer that is initialized in main:
        </Typography>
        <Highlight language="go" content={`sqlClient, err := sql.Open("sqlite3", "./database.db")
if err != nil {
    log.Fatalf("Could not open db: %v", err)
}`}/>
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
        <Highlight language="go" content=
{`func helloWorld(sqlClient *sql.DB) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ... your logic ... 
    })
}`}/>
        <Typography>
        This neat treat exposes our <b>sqlClient</b> scope to our custom function inside <b>HandlerFunc</b>.<br/>
        We can now, re-write main:<br/>
        </Typography>
        <Highlight language="go" content=
{`httpHandler := helloWorld(sqlClient)
http.ListenAndServe(":8080", httpHandler)`}/>
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
        <Highlight language="go" content=
{`func middleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ...
    }
 }`} />
        <br/>
        <Typography variant="h3">Logging</Typography>
        <Typography>
        Using middleware, we can now create a logging framework.<br/>
        </Typography>
        <Highlight language="go" content=
{`func loggerMiddleware(next http.Handler) http.Handler { 
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("Request received")
		next.ServeHTTP(w, r)
		log.Println("Request handled")
    })
}`} />
        <Typography>
        The key understanding here being <b>next.ServeHTTP</b>, which calls the inner handler.<br/>
        We can use our new logging middleware like so:
        </Typography>
        <Highlight language="go" content=
{`handler := loggingMiddleware(helloWorld(sqlClient)))
http.ListenAndServe(":8080", handler)`} />
        <Typography>
        Now.. it's a chain.<br/><br/>

        To view the full source for this demonstration, visit my <Link href='https://github.com/jbacon/api-joshbacon-name' target="_blank">GitHub Repo</Link>.<br/><br/>

        I hope this article was helpful.<br/>
        GoLang is a nifty language for building both simple and complex http servers.
        </Typography>
    </React.Fragment>
);
export default blog