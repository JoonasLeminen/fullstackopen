import {useState} from 'react'

const Button = ({handleClick, text}) =>
<button onClick={handleClick}>
  {text}
</button>

const Statistics = (props) => {
  console.log(props.statistics)
  if (props.statistics[3] >= 1) {
  return (
    <div>
      <p>Good {props.statistics[0]}</p>

      <p>Neutral {props.statistics[1]}</p>

      <p>Bad {props.statistics[2]}</p>

      <p>Total {props.statistics[3]}</p>

      <p>Avarage {props.statistics[4]}</p>

      <p>Positive {props.statistics[5]}%</p>
    </div>
  )
  }
}

const History = (total) => {
  console.log(total)
  if (total.history === 0) {
    return (
      <div>No feed back given</div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const avarage = (good - neutral) / (good + neutral + bad)
  const positive = good / (good + neutral + bad) * 100

const handleGoodClick = () => {
  console.log('Pressed good')
  setGood(good + 1)
}

const handleNeutralClick = () => {
  console.log('Pressed neutral')
  setNeutral(neutral + 1)
}

const handleBadClick = () => {
  console.log('Pressed bad')
  setBad(bad + 1)
}

  return (
    <div>
      <h2> Give feedback to Unicafe here</h2>
      <div>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      </div>
      <h2>Statistics</h2>
        <div><History history={total}/></div>
        <div><Statistics statistics={[good, neutral, bad, total, avarage, positive]}/></div>
        </div>
  )
}

export default App