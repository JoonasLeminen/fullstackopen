const Total = ({ course }) => {
    //console.log(course)
    //console.log(course.parts.map(part => part.exercises))
    const totalExercises = course.parts.map(part => part.exercises)
    const sum = totalExercises.reduce((total, exercises) => {
        return total + exercises;
    });
    //console.log(sum)

    return (
        <div>
            <b>Total of {sum} exercises</b>
        </div>
    )
}

const Course = ({ course }) => {
    //console.log(course)
    //console.log(course.parts)

    return (
        <div>
            <h2>{course.name}</h2>

            <ul>
                {course.parts.map(part =>
                    <li key={part.id}>
                        {part.name} {part.exercises}
                    </li>
                )}

                <li>
                    <Total course={course} />
                </li>

            </ul>
        </div>
    )
}

export default Course