const mongoose = require('mongoose')

const argumentsLength = process.argv.length

if (argumentsLength < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://fullstack:${ password }@cluster0.vhawzgn.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const printPersons = () => {
  console.log('phonebook:')
  Person.find({}).then(persons => {
    persons.forEach(person => console.log(`${ person.name } ${ person.number }`))
    mongoose.connection.close()
    console.log('disconnected')
  })
}

const createPerson = () => {
  const person = new Person({
    name,
    number,
  })
  person.save().then(() => {
    console.log(`${ name } saved`)
    mongoose.connection.close()
    console.log('disconnected')
  })
}

mongoose.connect(url).then(() => {
  console.log('connected')

  if (argumentsLength === 3) {
    printPersons()
  } else if (argumentsLength === 5) {
    createPerson()
  }
})
