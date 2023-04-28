import React, { useState } from "react";
import Header from "../components/Header";
import ListNavbar from "../components/ListNavbar";
import List from "../components/List";

function Todo() {
  const [currentList, setCurrentList] = useState(["My To-Do"]);

  function handleListSelection(selectedList) {
    setCurrentList(selectedList);
  }

  return (
    <div>
      <Header login={false} signup={false} logout={true} />
      <ListNavbar onListSelection={handleListSelection} />
      <List currentList={currentList} />
    </div>
  );
}

export default Todo;
