const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://joonasleminen:${password}@cluster0.t1bep09.mongodb.net/noteApp?retryWrites=true&w=majority`

//mongodb+srv://joonasleminen:sY7ym1km9kHPQU8l@cluster0.t1bep09.mongodb.net/noteApp?retryWrites=true&w=majority

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Mong is Easy',
  important: true,
})

note.save().then(
  console.log('note saved!'),
  mongoose.connection.close()
)

/*Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})*/

//Note.find({ important: true }).then(result => ...