import React from "react";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import ImageSpaghettiCode from "../../images/spaghetti-code.jpg";

const blog = () => (
  <>
    <Typography>
      Advancements in Web APIs give rise to single-page applications (SPA).
    </Typography>
    <br />
    <Typography variant="h2">What is SPA?</Typography>
    <Typography>
      Traditionally, navigating between web pages causes complete rending of a
      entire page&apos;s HTML content. More often than not, only part of a
      page&apos;s content typically changes between navigation. Inadvertently,
      and often times... headers, footers, menus, and titles are all re-rendered
      unnecessarily. So we must ask, why should the entire page reload just to
      render partial content? SPAs address this concern by using modern browser
      Javascript APIs to perform page modifications (DOM manipulations)
      on-the-fly. Browser support for asynchronous execution, events, listeners,
      etc, all make the DOM dynamic and reactive. Modern websites are made more
      effective thanks to SPA architecture. That said, even with great tooling
      from the likes of Google, Facebook, and Microsoft, SPAs are easier said
      than done... Maintaining speed, state, history, and events is a
      programmatic challenge. Frameworks have risen to the occasion and offer
      assistance to the aspiring web developer. Let&apos;s all avoid making our
      own home-cooked Javascript spaghetti.
      <br />
      <img alt="oops.. not available" height="100%" src={ImageSpaghettiCode} />
      <br />* Don&apos;t forget the meatballs
    </Typography>
    <br />
    <br />
    <Typography variant="h2">Framework Hell</Typography>
    <Typography>
      With the increased difficulty of building SPAs, frameworks have risen to
      fill a void. But choose wisely; that snazzy new framework could very well
      be tomorrow&apos;s technical debt.
      <br />
      There are many to choose from:
    </Typography>
    <ul>
      <li>react</li>
      <li>angular</li>
      <li>vue</li>
      <li>ember</li>
      <li>knockout</li>
      <li>polymer</li>
      <li>backbone</li>
      <li>flux</li>
    </ul>
    <Typography>
      <br />
      Has the native browser API failed us? Before starting this blog website, I
      was caught in the framework nether. Critical to choosing a architecture is
      thorough understanding of the direction of the modern web. Choosing
      cutting-edge tools that don&apos;t not reach wide-spread adoption is a
      real bummer (thanks Web Components). It and should be noted, eventually we
      will run out of acronyms: SSR, CSR, MVC, MVU, MVI, Flux, Redux, SPA,
      MPA... If you don&apos;t understand the high-level trade-offs of each
      technique, architecture, or tool you will succumb to the whim of the next
      popular buzz-word.
      <br />
      Criteria for Choosing Front-End Framework:
    </Typography>
    <ul>
      <li>Static Hosting</li>
      <li>Single Page</li>
      <li>Event Driven</li>
      <li>Lightweight</li>
      <li>Reactive</li>
      <li>Data Binding</li>
      <li>URL Routing</li>
    </ul>
    <Typography>
      <br />
      Component driven architecture is clearly the prevailing theme. For this
      blog I decided to use React in combination with Material UI. As much as I
      did love good old{" "}
      <Link href="http://vanilla-js.com/" target="_blank">
        VanillaJS
      </Link>
      . Non-the-less, the challenges of managing state, data, and events in
      VanillaJS are not simple, and conventions are not concisely defined. React
      allows me to build reactive components, manage state, and develop quickly.
      <br />
      <br />
    </Typography>
  </>
);
export default blog;
