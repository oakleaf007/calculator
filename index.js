

  const display= document.getElementById("output");
  let expression ="";

// shows the current display
  function updateDisplay(){
    display.value = expression || '0';

  }


// obtain number and update the display
  function number(num){
    expression+=num;
    updateDisplay();

  }


  // optain operation input such as plus, minus etc.
  function handleOp(op){

    if(expression ==='') return;

    const lastChar = expression[expression.length-1];

    // this is for replacing existing operator symbol 
    if(['+','-','*','/','%'].includes(lastChar)){
      expression = expression.slice(0,-1)+op;
      
    }else{
      expression += op;
    }
    updateDisplay();
  }

// fix for percentage issue
  function percent(){
    if(expression =='') return;

    const parts = expression.split(/[\+\-\*\/]/);
    const last = parts[parts.length-1];

    const percentValue = Number(last)/100;
    expression = expression.slice(0, -last.length)+ percentValue;
    updateDisplay();
  }


  // obtain if there is any decimal
  function decimal(){
    const part = expression.split(/[\+\-\*\/\%]/);
    const lastPart = part[part.length-1];
    if(!lastPart.includes('.')){
      expression+='.';

    }
    updateDisplay();
  }


  // this clears the screen
  function clear(){
    expression ="";
    updateDisplay();

  }
// backspace
function back(){
  if(expression.length>0){
    expression = expression.slice(0,-1);
    updateDisplay();
  }
}


function roundRes(num){
  return Math.round(num*1e12)/1e12;
}
  
  // you use eval for simpler syntax
let lastexp ='';
let res ='';


let msg = document.getElementById("msg");

  function calculate(){
    try{
      // const  finalExpression = expression.replace(/%/g,"/100");
      const result = roundRes(Function('"use strict"; return('+ expression +')')());
    //  const result = eval(expression);
     lastexp = expression;
     res = result;
    
 
  msg.textContent = `${lastexp} = ${res}`;
      expression = String(result);
    }
    catch{
      expression =" Error";
    }
    updateDisplay();
  }

function clrhis(){

 
  msg.textContent = 'History Cleared';
}

function quack(){
 
  
  const quacksound = new Audio("quack.mp3");
  quacksound.currentTime = 0;
  quacksound.play();
  
}
   

    

  // finally the button events

  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener("click", () =>{

      const action =btn.dataset.action;
      const value = btn.dataset.value;

      switch(action){
        case 'number' : number(value);
        break;
        case 'operator' : handleOp(value);
        break;
        case 'decimal' : decimal();
        break;
       case 'equal' : calculate();
       break;
       case 'clear' : clear() ;
       break;
       case 'back' : back();
       break;
       case 'percent': percent();
       break;
       case 'history' : clrhis();
       break;
       case 'quack' : quack();
      }
    });
  });


  // running the function to render the display
  updateDisplay();
