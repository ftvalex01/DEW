

/*  function printNumbers(num1,num2){
   let id=  setInterval (() => {
        if(num1 >= num2){
            clearInterval(id)
        }
        console.log (num1)
        
        num1++
        
        }, 1000)
}   */



 function printNumbers(num1,num2){
    console.log(num1)
    num1++
    if(num1 <= num2){
        setTimeout(printNumbers,1000,num1,num2);
    }
} 

setTimeout(printNumbers,1000,1,4);