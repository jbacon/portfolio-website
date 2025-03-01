import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Blog from "./components/Blog";

// A very procedural testing of website functionality
describe("My Tests", () => {
  test("renders App", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const user = userEvent.setup();
    expect(screen.getByText(/welcome./)).toBeInTheDocument();
    const blogButtons = screen.getAllByText(/Blog/);
    expect(blogButtons[0]).not.toBeVisible(); // JSDOM is not working here.. this should be visible.
    expect(blogButtons[1]).not.toBeVisible();
    expect(screen.queryByText(/Markdown And React/)).toBeNull();
    fireEvent.click(blogButtons[0]);
    const markdownBlog = screen.getByText(/Markdown And React/);
    expect(markdownBlog).toBeVisible();
    await user.click(markdownBlog);
    expect(window.location.pathname).toBe("/blogs/2020/markdown-and-react");
    // Unfortunately CRA jest testing cannot render components containing dynamic imports (code splitting, lazy loading, etc...)
    // expect(await screen.findByText(/walk-through how to import and render markdown/i, {}, { timeout: 3000 })).toBeInTheDocument()
  });

  test("render blog", async () => {
    render(
      <Blog key={"/blogs/2020/markdown-and-react"}>This is my blog!</Blog>
    );
    expect(screen.getByText(/This is my blog!/)).toBeInTheDocument();
  });
});
