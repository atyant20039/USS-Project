import React, { useEffect, useState } from "react";
import axios from "axios";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const List = ({ currentList }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, [currentList]);

  const getTasks = async () => {
    try {
      let response = await axios.get(`/api/${currentList}`);
      setTasks(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
    </div>
  );
};

export default List;
