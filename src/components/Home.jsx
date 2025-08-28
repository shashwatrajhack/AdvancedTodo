import React, { useEffect, useState } from "react";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [toggle, setToggle] = useState(false);
  const [todo, setTodo] = useState([]);
  const [idx, setIdx] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(3);
  const [pageArr, setPageArr] = useState([]);
  const [triggerLocal, setTriggerLocal] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let data1 = JSON.parse(localStorage.getItem("value"));
    if (data1) {
      setTodo([...data1]);
    }
    updatePage(data1);
  }, [itemPerPage, triggerLocal]);

  const updatePage = (data1) => {
    let arrLength = data1 ? data1.length : 0;
    let noOfPage = Math.ceil(arrLength / itemPerPage);
    setPageArr([...Array(noOfPage).fill(null)]);
  };
  const handleAddTodo = () => {
    for (let i = 0; i < todo.length; i++) {
      if (todo[i].name === inputValue) {
        return window.alert("already exist");
      }
    }
  //this will run in case of update button
    if (toggle) {
      todo[idx].name = inputValue;

      setTodo([...todo]);
    } 
    //this will run if there is add
    else {
      todo.push({ name: inputValue, isChecked: false });
      setTodo([...todo]);
    }
    saveInLocal();
    setInputValue("");
    setToggle(false);
  };

  const editTodo = (i) => {
    setIdx(i);
    setToggle(true);

    setInputValue(todo[i].name);
  };

  const deleteTodo = (i) => {
    todo.splice(i, 1);

    setTodo([...todo]);
    saveInLocal();
  };

  const handleUp = (i) => {
    let temp = todo[i];
    todo[i] = todo[i - 1];
    todo[i - 1] = temp;

    setTodo([...todo]);
    saveInLocal();
  };

  const handleDown = (i) => {
    let temp = todo[i];
    todo[i] = todo[i + 1];
    todo[i + 1] = temp;

    setTodo([...todo]);
    saveInLocal();
  };

  const markDOne = (i) => {
    todo[i].isChecked = !todo[i].isChecked;
    // let temp = todo.splice(i,1);
    // todo.push(temp[0])
    setTodo([...todo]);
    saveInLocal();
  };
  const saveInLocal = () => {
    localStorage.setItem("value", JSON.stringify(todo));
    setTriggerLocal(!triggerLocal);
  };
  const handleSelet = (e) => {
    setItemPerPage(e.target.value);
  };
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentTodos = todo.slice(startIndex, endIndex);
  if (todo.length && currentTodos.length === 0) {
    setCurrentPage(currentPage - 1);
  }
  return (
    <div>
      <header>Todo List</header>

      <div className="todoBody">
        <div className="input_content">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button onClick={handleAddTodo} disabled={!inputValue.trim()}>
            {toggle ? "Update" : "Add Todo"}
          </button>
        </div>
        <div>
          {todo.length > 2 && (
            <label className="dropdown">
              Items per page:
              <select
                id="itemsPerPage"
                defaultValue="3"
                onChange={(e) => handleSelet(e)}
              >
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </label>
          )}
        </div>
        <div className="logic_content">
          <ul>
            {currentTodos.map((x, i) => (
              <li key={i}>
                <span className={`${x.isChecked ? "disable-line" : ""}`}>
                  {x.name}
                </span>
                <div>
                  {i != 0 && !x.isChecked && (
                    <i
                      className="material-icons up"
                      title="Move Up"
                      onClick={() => handleUp(i)}
                    >
                      keyboard_arrow_up
                    </i>
                  )}
                  {i != todo.length - 1 && !x.isChecked && (
                    <i
                      className="material-icons down"
                      title="Move Down"
                      onClick={() => handleDown(i)}
                    >
                      keyboard_arrow_down
                    </i>
                  )}
                  {!x.isChecked && (
                    <i
                      className="material-icons delete"
                      title="Delete"
                      onClick={() => deleteTodo(i)}
                    >
                      delete_forever
                    </i>
                  )}
                  {!x.isChecked && (
                    <i
                      className="material-icons edit"
                      title="Edit"
                      onClick={() => editTodo(i)}
                    >
                      edit
                    </i>
                  )}

                  <i
                    className={`fa ${
                      x.isChecked
                        ? "fa-check-circle icon-color"
                        : "fa-check-circle-o"
                    } checked`}
                    onClick={() => markDOne(i)}
                  ></i>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {pageArr.length > 0 && (
          <div className="pagination">
            
            {pageArr.map((x, i) => (
              <div>
              <a onClick={() => setCurrentPage(i + 1) }>&laquo;</a>
              <a
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </a>
              <a onClick={() => setCurrentPage(i - 1) }>&raquo;</a>

              </div>
            ))}

            
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
