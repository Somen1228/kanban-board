const JSObject = {
    ticketId: "123",
    ticketName: "King Kong",
    ticketType: "3D",
}


localStorage.setItem("key", "value")
localStorage.setItem("ticket", JSON.stringify(JSObject))

console.log(JSON.parse(localStorage.getItem("ticket")))
localStorage.removeItem("ticket")