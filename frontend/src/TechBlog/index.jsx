import AppBar from "../Component/AppBar"
import QuicknoteCard from "../Component/QuicknoteCard"
import ReactMarkdown from 'react-markdown'

export default function TechBlog() {
    return (
        <div>
            <AppBar title="Tech blog"/>
            {/* <h1>This is the techblog of Joe zhuang's personal website</h1>
            <ReactMarkdown># The First Note</ReactMarkdown>
            <ReactMarkdown>## The First Note</ReactMarkdown>
            <ReactMarkdown>### The First Note</ReactMarkdown>
            <ReactMarkdown>_Another note_</ReactMarkdown>
            <ReactMarkdown>Visit [this page](https://www.digitalocean.com/community/tutorials) for more tutorials.</ReactMarkdown> */}
            <QuicknoteCard />
        </div>
    )
}