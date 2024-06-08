// const array = ["lightpink", "lightblue", "black", "green"]
// 
// const index = array.findIndex((curr) => {
//     return curr === "black"
// })
// 
// console.log(index)

const array = [
    {
        id: "2e4rd",
        name: "Somen"
    },
    {
        id: "2e5rd",
        name: "Golu"
    },
    {
        id: "2e6rd",
        name: "Animesh"
    },
    {
        id: "2e7rd",
        name: "Subhash"
    },
]

const value = array.find((currStep) => {
    return currStep.id == "2e4rd"
})

console.log(value);
value.id = "2e99rd"

console.log(array);

