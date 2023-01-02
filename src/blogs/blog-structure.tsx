// arrays maintain order, objects do not
// [ { year: [ {article-url: article-title }]}]

type BlogStructure = Blog[];

interface Blog {
  year: number;
  articles: Article[];
}

interface Article {
  filename: string;
  title: string;
}

const blogStructure: BlogStructure = [
  {
    year: 2020,
    articles: [
      { filename: "markdown-and-react.md", title: "Markdown And React" },
      {
        filename: "building-a-simple-golang-api.tsx",
        title: "Building A Simple GoLang API",
      },
      {
        filename: "publish-a-react-component.tsx",
        title: "Publishing A React Component",
      },
    ],
  },
  {
    year: 2015,
    articles: [
      {
        filename: "a-narrative-on-web-applications.tsx",
        title: "A Narrative On Web Applications",
      },
      {
        filename: "multi-page-vs-single-page-applications.tsx",
        title: "Multi-page vs Single-page Applications",
      },
    ],
  },
];

export default blogStructure;
