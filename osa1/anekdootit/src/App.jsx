import { useState} from 'react'

const Button = ({handleClick, text}) =>
<button onClick={handleClick}>
  {text}
</button>

const points = new Array(8).fill(0)
const copy = [...points]

const Votes = (copy) => {
  //console.log(copy)
  return (
    <div>
      Anecdote had {copy.votes} votes before you
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  console.log(copy)
  //console.log(copy[selected])
  console.log(Math.max(...copy))


  const getRandom = () => {
    //console.log(Math.floor(Math.random() * 8))
    setSelected(Math.floor(Math.random() * 8))
  }

  const AddVote = () => {
    console.log('Vote added')
    copy[selected] += 1
    //console.log(copy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <div>
      <Button handleClick={getRandom} text='Next anecdote' />
      <Button handleClick={AddVote} text='Vote' />
      <Votes votes={copy[selected]} />
      </div>
      <h2>Anecdote with most votes</h2>
    </div>
  )
}

export default App