import Person from './Person'

const Persons = ({persons, handleDelete})=>(
    <div>
    {persons.map(person => <><Person key={person.name} name={person.name} number ={person.number}/> <button onClick={()=>{return handleDelete(person.id, person.name)}}>Delete</button><br/></>)}
    </div>
  )

export default Persons