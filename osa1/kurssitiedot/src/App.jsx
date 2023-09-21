const Header = (props) => {
  console.log(props)
  return (
    <div>
      {props.course}
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
      {props.part1} {props.exercises1}
      {props.part2} {props.exercises2}
      {props.part3} {props.exercises3}
    </div>
  )
}

const Content = () => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Part part1={part1} exercises1={exercises1}/>
      <Part part2={part2} exercises2={exercises2}/>
      <Part part3={part3} exercises3={exercises3}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Total amount {props.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14
  const total = exercises1+exercises2+exercises3

  return (
    <div>
      <h1><Header course={course}/></h1>
        <Content/>
        <Total total={total}/>
    </div>
  )
}

export default App