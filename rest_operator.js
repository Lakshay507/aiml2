console.log("Rest Operator Example");

function sum(...numbers) {
    console.log("Numbers: ", numbers);
    for(let n of numbers) {
    console.log(n);
    
}
}

sum(1, 2, 3, 4, 5); 
