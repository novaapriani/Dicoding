const initialMemoryUsage = process.memoryUsage().heapUsed
const yourName = process.argv[2]
const environment = process.env.NODE_ENV

for (let i = 0; i <= 10000; i++) {
  // proses looping ini akan membuat penggunaan memori naik
  // meski di dalamnya tidak melakukan apapun
}

const currentMemoryUsage = process.memoryUsage().heapUsed

console.log(`Hai, ${yourName}`)
console.log(`Metode environment ${environment}`)
console.log(
  `Penggunaan memori dari ${initialMemoryUsage} naik ke ${currentMemoryUsage}`,
)

// CMD
// SET NODE_ENV=development && node index Nova
