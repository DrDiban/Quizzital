import React from "react"
import Question from "./components/Question"
import './style.css';


export default function App() {
    
    const [quizData, setQuizData] = React.useState([])
    const [quizAllData,setQuizAllData]=React.useState(createData())
    const [submit,setSubmit]=React.useState(setSubmitCond())
    const [refresh,setRefresh]=React.useState(true)
    const [start,setStart]=React.useState(true)


    function startClick(){
        setStart(false)
}
    function setSubmitCond(){
        return {
        state:false,
        count:0}
        
    }
    function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        }
        
    }
    
    function createData(){
        const allData=[]
        for (let i=0; i<quizData.length; i++){
            const ans=[]
            let idx=i
            idx=idx.toString()
            ans.push([quizData[i].correct_answer.replace(/&#039;/g,"'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&eacute;/g,"é").replace(/&eaacute;/g,"é").replace(/&ntilde;/g,"ñ"),false,idx+String(0)])   
            for (let j=0; j<quizData[i].incorrect_answers.length;j++){
                ans.push([quizData[i].incorrect_answers[j].replace(/&#039;/g,"'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&eacute;/g,"é").replace(/&eaacute;/g,"é").replace(/&ntilde;/g,"ñ"),false,idx+String(j+1)])
            }
            shuffleArray(ans)
            
            const zet={
                key:idx,
                question:quizData[i].question.replace(/&#039;/g,"'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&eacute;/g,"é").replace(/&eaacute;/g,"é").replace(/&ntilde;/g,"ñ"),
                answer:ans
                }
            allData.push(zet)
        }
        return allData
        
    }
    function buttClick(id,submit) {
        if (!submit){
        setQuizAllData(oldData => oldData.map(idx => {
            console.log(idx)
            console.log(idx.key===id[0])
            console.log(idx.key,id[0])
        
            if (idx.key===id[0]){
                let temp={...idx}
                
                
                for (let i=0;i<temp.answer.length;i++){
                    console.log(temp.key)
                    if (temp.answer[i][2]===id){
                        temp.answer[i][1]=true
                    }
                    else{
                        temp.answer[i][1]=false
                    }
                }
                return temp
            }
            else{
                return idx
            }
            
        }))
        }

    }
    

    
    React.useEffect(function() {
        
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res => res.json())
        .then(data => setQuizData(data.results)) 
    },[refresh])
    
    React.useEffect(function() {
        setQuizAllData(createData())
    },[quizData])
    
    
    
    const questElements = quizAllData.map(data => (
        <Question
            key={data.key} 
            question={data.question} 
            answer={data.answer}
            buttClick={buttClick}
            submitState={submit.state}
        />
    ))
    function subClick() {
        if (!submit.state){
        setSubmit(old=>{
            let val=0;
            for(let i=0;i<quizAllData.length;i++){
            for(let j=0;j<quizAllData[i].answer.length;j++){
                if(quizAllData[i].answer[j][2][1]==='0' && quizAllData[i].answer[j][1]){
                    val++;
                }
            }
        }
        console.log(val)
        return {state:!old.state,count:val}
        })}
        
        else{
            setRefresh(old=>!old)
            setSubmit(setSubmitCond())
        }
    }
    
    return (
        <div>
        
        {start && <div>
        <div className="imageTop">
        <img src="./img/bigYellow.png"/>
        </div>
            <div className="mainFrontPage">
                <h1 className="wordFrontPage">Quizzical</h1>
                <div className="buttonContainer" onClick={()=>startClick()}>
                <h2 className="buttonFrontPage">Start quiz</h2>
                </div>
            </div>
        <div className="imageBottom">
        <img src="./img/bigBlue.png" align="left"/>
        </div>
        </div>
        }
        
        
        {!start && <div>
            
            <img src="./img/yellow.png" align="right"/>
            
             <div className="mainBlock">
            {questElements}
            </div>
            <div className="sub-All">
                {submit.state && <h2 className="sub-text">You scored {submit.count}/{quizAllData.length} correct answers</h2>}
                <div className="sub-face" onClick={()=>subClick()}>
                    <h2 className="sub-val">{submit.state ? "Play Again":"Check answers"}</h2>
                </div>     
            </div>
            
            <img src="./img/blue.png" align="left"/>
            
        </div>}
        </div>
    )
}