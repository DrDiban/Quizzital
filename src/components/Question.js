import React from 'react'
import Buttons from "./Buttons.js"


export default function Question(props){
    
    const quesAnswer = props.answer.map(ans => {
        
        return <Buttons value={ans[0]} 
                        key={ans[2]} 
                        attr={ans[2]}
                        state={ans[1]} 
                        buttClick={() => props.buttClick(ans[2],props.submitState)}
                        submitState={props.submitState} />
    })
    return(
        <div className="quesAnsBlock">
            <h3 className="question">
            {props.question}
            </h3>
            <div className="boxes">
            {quesAnswer}
            </div>
            
            
        </div>
    )
}