// arrays maintain order, objects do not
// [ { year: [ {article-url: article-title }]}]
const blogStructure = [
    {
        2020: [
            { "markdown-and-react.md": "Markdown And React" },
            { "building-a-simple-golang-api.js": "Building A Simple GoLang API" },
            { "publish-a-react-component.js": "Publishing A React Component" },
        ]
    },
    {
        2015: [
            { "a-narrative-on-web-applications.js": "A Narrative On Web Applications" },
            { "multi-page-vs-single-page-applications.js": "Multi-page vs Single-page Applications" }
        ]
    }
]
export default blogStructure