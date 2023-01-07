import { useState, useEffect } from 'react'
import numberService from './services/numbers'
import Filter from './components/Filter'
import NameForm from './components/NameForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const filteredPersons = persons.filter(person => person.name.toUpperCase().includes(newFilter))

  const handleNameChange = (event)=>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event)=>{
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value.toUpperCase())
  }

  const notify = (type, nimi)=>{
    setNotification([type,nimi])
    setTimeout(() => {setNotification(null)}, 5000)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      notify("delete", name)
      numberService.poista(id).then(()=>(numberService.create()).then(response => {setPersons(response.data)}))
    }
  }

  const addNewName = (event) => {
    event.preventDefault()
    if (persons.filter(e => e.name===newName).length>0){
      if (window.confirm(`${newName} is already added to phonebook. Do you want to update?`)){
        let person = persons.find(n => n.name === newName)
        let newPerson = { ...person, number: newNumber}
        numberService.put(newPerson).then(()=>(numberService.create()).then(response => {
          setPersons(response.data)
          setNewName('')
          setNewNumber('')
          notify('edit', newName)
        })).catch(error => {
          notify('error2', error.response.data.error)
          console.log(error.response.data)
        })
      } 
    }
    else{
      let person = {name: newName, number: newNumber}
      numberService.update(person).then((response)=>{
        setNewName('')
        setNewNumber('')
        setPersons(persons.concat(response.data))
        notify('add', newName)
      }).catch(error => {
        setNewName('')
        setNewNumber('')
        notify('error2', error.response.data.error)
        console.log(error.response.data)
      })
    }
  }

  useEffect(() => {numberService.create().then(response => {setPersons(response.data)})}, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notification}/>
      <Filter change={handleFilter}/>
      <h2>Add a new</h2>
      <NameForm submit={addNewName} nameChange={handleNameChange} newName={newName} numberChange={handleNumberChange} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )

}

export default App