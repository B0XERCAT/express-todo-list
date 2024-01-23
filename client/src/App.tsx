import { useEffect, useState } from "react";
import { baseUrl } from "./vars";
import Header from "../@/components/Header";
import InputCard from "../@/components/InputCard";
import { Todo } from "../@/lib/types";
import TodoCard from "../@/components/TodoCard";
import "./App.css";

function App() {
  const [todos, setTodos] = useState<Todo[]>();

  useEffect(() => {
    fetch(baseUrl + "/todo")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, [todos]);

  const onCheck = async (id: number) => {
    try {
      await fetch(baseUrl + "/todo/check/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 201) {
          console.log("Success");
        }
        setTodos((prevTodos) =>
          prevTodos?.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onDelete = async (id: number) => {
    try {
      await fetch(baseUrl + "/todo/delete/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.status === 201) {
          setTodos((prevTodos) => prevTodos?.filter((todo) => todo.id !== id));
          console.log("Success");
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="m-6 flex justify-center">
        <InputCard />
      </div>
      {todos?.map((todo) => {
        return (
          <div key={todo.id} className="flex justify-center">
            <TodoCard
              todo={todo}
              onCheck={onCheck}
              onDelete={onDelete}
            ></TodoCard>
          </div>
        );
      })}
    </>
  );
}

export default App;
