const Notification = ({type}) => {
    if (type === null) {
      return null
    }
    if (type[0]==="add")
    return (
      <div className="notification add">
        Added user {type[1]}
      </div>
    )
    if (type[0]==="delete") {
      return (
        <div className="notification delete">
          Deleted user {type[1]}
        </div>
      )
    }
    if (type[0]==="edit"){
      return (
        <div className="notification add">
          Changed phonenumber of {type[1]}
        </div>
      )
    }
    if (type[0]==="error"){
      return (
        <div className="notification delete">
        User {type[1]} has already been deleted
        </div>
      )
    }
    if (type[0]==="error2"){
      return (
        <div className="notification delete">
        {type[1]}
        </div>
      )
    }
  }

  export default Notification