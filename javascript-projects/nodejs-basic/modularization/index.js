import Tiger from "./Tiger.js"
import Wolf from "./Wolf.js"

const fighting = (tiger, wolf) => {
  if (tiger.strength > wolf.strength) {
    return tiger.growl()
  }
  if (wolf.strength > tiger.strength) {
    return wolf.howl()
  }
  return "Tiger and Wolf have same strength"
}

const tiger = new Tiger()
const wolf = new Wolf()

console.log(fighting(tiger, wolf))
