import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [editIsActive, setEditIsActive] = useState(false);

  const deleteListItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const updateListItem = (id, note) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        item.title = note.title;
        item.desc = note.desc;
      }
      return item;
    });
    setList(newList);
  };

  return (
    <AppContext.Provider
      value={{
        list,
        setList,
        setEditIsActive,
        editIsActive,
        deleteListItem,
        updateListItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
