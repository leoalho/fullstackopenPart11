const NameForm = ({submit, nameChange, newName, numberChange, newNumber}) => (
    <form onSubmit={submit}>
    <div>
      name: <input onChange={nameChange} value={newName}/>
    </div>
    <div>
      number: <input onChange={numberChange} value={newNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )

export default NameForm