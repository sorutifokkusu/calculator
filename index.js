/*
import React 
import ReactDOM 
The project is made in codepen.io
*/

class App extends React.Component{
  // Input for showing on screen, current for parsing it to a float and adding it to the formula
  //op list for taking operators and putting them in formula
  //num for checking if the last button click was operator or number
  constructor(props){
    super(props)
    this.state=({
      input:"0",
      current:"0",
      oplist:[],
      num:true,
      formula:[],
      result:"",
      firstinput:true,
      inputholder:"",
      
    })
    
  }

  
//Calculation formul format [num,[...operators],num...]  
calculate(formul){
    function chk(list){
        if(list.length>1){
           // console.log(list[list.length-1])
            if(list[list.length-1] !== "-"){
                return [list[list.length-1]]
            }
            else if(list[list.length-1] == "-"){
                return [list[list.length-2],list[list.length-1]]
            }
        }
        else{
            return list
        }
    }
    let x = formul.map((y)=> chk(y))
    
    let lastop = ""
    let lastres = 0
    let buf= 0
    let regnum = /[0-9]/
    let isnegative = false
    function lastly(input){
        let argument = input

        if(isnegative){
            argument = -argument 
        }

        if(regnum.test(argument)){
            if(lastres !== 0){
                if(lastop!==""){
                    switch(lastop){
                        case "+": return (lastres = lastres + argument,lastop="")
                        case "-": return (lastres = lastres - argument,lastop="")
                        case "/": return (lastres = lastres / argument,lastop="")
                        case "*": return (lastres = lastres * argument,lastop="")
                    }
                }
            }
            else if(buf !==0){
                if(lastop!==""){
                    switch(lastop){
                        case "+": return (lastres = buf + argument,lastop="")
                        case "-": return (lastres = buf - argument,lastop="")
                        case "/": return (lastres = buf / argument,lastop="")
                        case "*": return (lastres = buf * argument,lastop="")
                    }
                }
            }
            else if(buf === 0){
                buf = argument 
            }
        }
        else if(argument.length===1){
            lastop= argument[0]
            isnegative = false
        }
        else if(argument.length>1){
            lastop= argument[0]
            isnegative = true
        }
    }
    
    x.map((y)=>lastly(y))
    return lastres
}
 
//Number Input 
numInp(val){
    if(this.state.input!=="0" & this.state.num){
    this.setState({input:this.state.input+val,inputholder:this.state.input+val ,current:this.state.current+val,firstinput:false})}
    else if(this.state.input!=="0"){
      this.setState({input:this.state.input+val,current:val,inputholder:this.state.input+val ,oplist:[],num:true,formula:this.state.formula.concat(parseFloat(this.state.current),[this.state.oplist])})}
    else if(this.state.input==="0"){
      this.setState({input:val,current:val,inputholder:this.state.input+val ,firstinput:false})
    }
  else if(this.state.input=="+"|this.state.input=="-"){
    this.setState({input:this.state.input+val,inputholder:this.state.input+val ,current:this.state.current+val})
  }
    }

//Decimal Input
decimalInp(){
  const reg = /[.]/
  if(reg.test(this.state.current)===false){
    this.setState({input:this.state.input+".",inputholder:this.state.input+".",current:this.state.current+"."})
  }
}

//Operator Input
/*
  If we start with a negative number first we dont add it("-") to the op list. parseFloat will return with a negative number or positive if ("+")
  
  Before entering number only "+" and "-" works and can be switched.
  
  After a number has entered it will accept any operator while oplist.length==0, if  oplist.length>0 
  (which means there was a operator before) it will check oplist[0] whetever it is "/" or "*"
  (for negative number) if it is it will let ("/-") and ("*-")  in any other situation
  oplist = [val] 
*/
opInp(val){
  
  if( val=="-" & this.state.firstinput | val=="+" & this.state.firstinput){
  this.setState({input:val,current:val,inputholder:val ,num:true})
  }
  else if(this.state.firstinput==false){
    if(this.state.num){
    this.setState({input:this.state.input+val,oplist:this.state.oplist.concat(val),num:false})}
    else{
      if(this.state.oplist.length==0){
        this.setState({input:this.state.inputholder+val,oplist:this.state.oplist.concat(val),num:false})
      }
      else if(val=="-" & this.state.oplist[0]=="/" & this.state.oplist.length==1 | val=="-" & this.state.oplist[0]=="*" & this.state.oplist.length==1){
        this.setState({input:this.state.input+val,oplist:this.state.oplist.concat(val),num:false})
      }
      else if(this.state.oplist.length==1|this.state.oplist.length==2){
        this.setState({input:this.state.inputholder+val,oplist:[val],num:false})
      }
    }
  }
  
}
  
// =
equal(){
  let formul = this.state.formula
  formul = formul.concat(parseFloat(this.state.current))
  let result = this.calculate(formul)
  this.setState({ input:result,
      current:result,
      oplist:[],
      num:true,
      formula:[],
      result:"",
      inputholder:result,
                })
}
  
// clear n reset
  clear(){
    this.setState({ input:"0",
      current:"0",
      oplist:[],
      num:true,
      formula:[],
      result:"",
      firstinput:true ,
      inputholder:"",})
  }
  

  render(){
 
    return(
    <div class=" text-center calculator position-absolute top-50 start-50 translate-middle pt-2 ">
        <p class="bottom-text">Calculator Project</p>
        <div class="d-flex flex-row justify-content-center result mb-1">
        <text id="display" class="text-break">{this.state.input}</text>
        </div>
         <div class="d-flex flex-row justify-content-center">                                                                          
                        
                </div>
        <div class="d-flex flex-row justify-content-center">
          
          <button id="one" class="btn  col" onClick={()=> this.numInp("1")}>1</button>
          <button id="two" class="btn col" onClick={()=> this.numInp("2")}>2</button>
          <button id="three" class="btn  col" onClick={()=> this.numInp("3")}>3</button>
          <button id="add" class="btn   col" onClick={()=> this.opInp("+")}>+</button> 
        </div>
        
        <div class="d-flex flex-row justify-content-center">                             
          <button id="four" class="btn  col" onClick={()=> this.numInp("4")}>4</button>                  
          <button id="five" class="btn  col" onClick={()=> this.numInp("5")}>5</button>
          <button id="six" class="btn   col" onClick={()=> this.numInp("6")}>6</button> 
          <button id="subtract" class="btn col" onClick={()=> this.opInp("-")}>-</button>
          </div>
        
          <div class="d-flex flex-row justify-content-center">                                    
          <button id="seven" class="btn   col" onClick={()=> this.numInp("7")}>7</button>                       
          <button id="eight" class="btn  col" onClick={()=> this.numInp("8")}>8</button>
                 <button id="nine" class="btn col" onClick={()=> this.numInp("9")}>9</button>
            <button id="multiply" class="btn col" onClick={()=> this.opInp("*")}>*</button>
            </div>
        
            <div class="d-flex flex-row justify-content-center">                              
           <button id="decimal" class="btn col" onClick={()=> this.decimalInp()}>.</button> 
           <button id="zero" class="btn col" onClick={()=> this.numInp("0")}>0</button>
            
          <button id="equals" class="btn   col" onClick={()=> this.equal()}>=</button> 
               <button id="divide" class="btn  col" onClick={()=> this.opInp("/")}>/</button>
              </div>
        <div class="d-flex flex-row justify-content-center">  
          <button id="clear" class="btn col" onClick={()=> this.clear()}>C</button> 
         </div>
        
        
        
               
      
    </div>
    )
  }
}


ReactDOM.render(<App/>,document.getElementById("root"))

// Immediate Execution Logic

/*
This is for freecodecamp project
// Stuff I've used //

Bootstrap - React - ReactDOM - Babel

Note: Even though you can put multiple operators like for example (3+++****+++*+3) it will be equal to (3+3)
only (*-) and (\/-) are going to be considered together for negative numbers 
-Update : Fixed in state , numInp & opInp
*/
