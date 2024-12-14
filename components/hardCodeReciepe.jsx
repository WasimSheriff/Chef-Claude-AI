import React from "react"
import ReactMarkdown from "react-markdown"
const ClaudeReciepe=(props)=>{
    return(
        <section className="suggested-recipe-contain" aria-live="polite">
            <h2>Chef Claude Recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
}
export default ClaudeReciepe;