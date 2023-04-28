import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import GradeIcon from "@mui/icons-material/Grade";
import TodayIcon from "@mui/icons-material/Today";

const lists = [
  { name: "My To-Do", icon: TaskAltIcon },
  { name: "Important", icon: GradeIcon },
  { name: "Planned", icon: TodayIcon },
];

function ListNavbar({ onListSelection }) {
  const handleList = (selectedList) => {
    onListSelection(selectedList);
  };

  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              {lists.map((list) => (
                <button
                  key={list.name}
                  onClick={() => handleList(list.name)}
                  className="w-full flex items-center p-2 text-base font-semibold text-black rounded-lg hover:bg-gray-200"
                >
                  <list.icon />
                  <span className="ml-3">{list.name}</span>
                </button>
              ))}
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default ListNavbar;
