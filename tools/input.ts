import  readline from "readline";

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const a = new Promise((res)=>{
    rl.question("input a number:",r=>{
        res(r)
    })
})

a.then(r=>{
    console.log(r);
    
})
