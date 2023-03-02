import { EventEmitter } from "events"

const birthdayEventListener = (name) => {
  console.log(`Happy birthday ${name}!`)
}

const myEmitter = new EventEmitter()

myEmitter.on("birthday", birthdayEventListener)

myEmitter.emit("birthday", "Nova")

// kalo parameternya objek
// myEmitter.emit("birthday", { name: "Nova" })
