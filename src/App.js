import React, { useState, useEffect, useRef } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  // ref for the focus
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("all is clear");
    if (!name) {
      // setAlert({ show: true, msg: "please enter value!", type: "danger" });
      showAlert(true, "please enter value!", "danger");
    } else if (name && isEditing) {
      // updating the list
      const newList = list.map((item) => {
        if (item.id === editID) {
          return { ...item, title: name };
        }
        return item;
      });
      setList(newList);
      // everything is back to the default
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "item updated", "success");
    } else {
      showAlert(true, "item added to the list", "success");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    showAlert(true, "all items deleted!", "danger");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "item deleted!", "danger");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setName(specificItem.title);
    setEditID(id);
    inputRef.current.select();
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={inputRef}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
