import {useState} from 'react'

const Button = ({handleClick, text}) =>
<button onClick={handleClick}>
  {text}
</button>

const StatisticLine = ({text, value}) => {
  // console.log(text, value)
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  // console.log(props.statistics)
  if (props.statistics[3] >= 1) {
  return (
    <table>
      <tbody>
      <StatisticLine text="Good" value={props.statistics[0]}/>
      <StatisticLine text="Neutral" value={props.statistics[1]}/>
      <StatisticLine text="Bad" value={props.statistics[2]}/>
      <StatisticLine text="Total" value={props.statistics[3]}/>
      <StatisticLine text="Avarage" value={props.statistics[4]}/>
      <StatisticLine text="Positive%" value={props.statistics[5]}/>
      </tbody>
      </table>
  )
  }
}

const History = (total) => {
  // console.log(total)
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
  const avarage = (good - bad) / (good + neutral + bad)
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