import React from 'react'



export default function Buttons(props){
    console.log(props.state)
    console.log("state")
    const styles = {
        backgroundColor: props.state ? "#D6DBF5" : "#F5F7FB",
        border:props.state ?"0.771045px solid #D6DBF5": "0.771045px solid #4D5B9E"
    }
    function styleSubmit(){
        if (props.attr[1]==="0"){
            return {
                backgroundColor: "#94D7A2",
                border:"0.771045px solid #94D7A2"
                
            }
        }
        else{
            if(props.state){
                return{
                    backgroundColor: "#F8BCBC",
                    border:"0.794239px solid #F8BCBC",
                    opacity:"0.5"
                }
            }
            else{
                return{
                    backgroundColor: "#F5F7FB",
                    border:"0.794239px solid #4D5B9E",
                    opacity:"0.5"
                }
                
            }
        }
        
    }
    let style2=styleSubmit()
    return (
        <div 
            className="ans-face" onClick={props.buttClick}
            style={props.submitState ?style2:styles}
        >
            <h2 className="ans-val">{props.value}</h2>
        </div>
    )
}