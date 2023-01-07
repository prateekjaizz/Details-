
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [students, setStudents] = useState([])
  const [student, setStudent] = useState({
    roll: null,
    name: "",
    InTime: "",
    OutTime: null
  })
  const [alert, setAlert] = useState("");
  const [priority, setPriority] = useState([]);
  const [presentStudents, setPresentStudents] = useState([]);
  const d = new Date()


  useEffect(() => {
    console.log(priority);
  }, [priority]);

  const handleStudent = (e) => {
    e.preventDefault();
    // console.log()
    setStudent({ ...student, [e.target.name]: e.target.value, InTime: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`, OutTime: "" });
    // console.log(student);
  }

  const CheckIn = () => {
    // console.log(student)
    if (student.roll === null || student.name === "") {
      setAlert("Please Provide Roll Number or Name");
    } else {
      setAlert("")
      const index = students.findIndex((n) => n.roll === student.roll);
      // console.log(index);
      if (index === -1) {
        setStudents([...students, student]);
        setPresentStudents([...presentStudents, student]);
        console.log(students)
        console.log(presentStudents)
      } else {
        // console.log(index)
        setAlert(`Roll No:-${students[index].roll} Already in the Class`);
      }
    }
    // console.log(students)
  }



  const CheckOut = (present) => {
    console.log(students);
    const index = students.findIndex((roll) => roll.roll === present.roll);
    students[index].OutTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    presentStudents.splice(present, 1)
    setPriority(present);
    console.log("Total Students :-")
    console.log(students);
    console.log("Present Students :- ")
    console.log(presentStudents);
  }


  return (
    <div className="App">
      <div className="Enter">
        <input placeholder='Enter Roll Number ....' name="roll" onChange={e => handleStudent(e)} required />
        <input placeholder='Enter Your Name ...' name="name" onChange={e => handleStudent(e)} required />
        <h4>Enter the Class</h4>
        {
          alert ?
            <>
              <p className='alert'>{alert}</p>
              <button className="CheckIn" onClick={() => CheckIn()}>Check In</button>
            </> :
            <button className="CheckIn" onClick={() => CheckIn()}>Check In</button>
        }
      </div>

      <div className="Classroom">
        <h4>Total Students</h4>
        {
          students.length > 0 &&
          <div className='Time'>
            <h4>Check In Time</h4>
            <h4>Check Out Time</h4>
          </div>

        }
        {students &&
          students.map((present) => {
            return (

              <div className='Student' key={present.roll}>
                <h5>{present.InTime}</h5>
                <hr />
                <h4>{present.name}-{present.roll}</h4>
                <hr />
                {
                  !present.OutTime ?
                    <button className='Button' onClick={() => CheckOut(present)}>CheckOut</button>
                    :
                    <button className='Button' disabled>CheckedOut at:-</button>
                }
                <hr />
                <h5>{present.OutTime}</h5>
              </div>
            )
          })
        }
        <hr />
        <div className='Present'>Present Students :- {presentStudents.length}</div>
      </div>

    </div>
  );
}

export default App;
