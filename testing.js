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

const value = array.findIndex((currStep) => {
    return currStep.id == "2e5rd"
})

array.splice(value, 2)
console.log(array);

