import { useEffect, useState } from "react";
import { baseUrl } from "./vars";
import Header from "../@/components/Header";
import InputCard from "../@/components/InputCard";
import { Todo } from "../@/lib/types";
import TodoCard from "../@/components/TodoCard";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoDetail from "../@/components/TodoDetail";

function App() {
  const [todos, setTodos] = useState<Todo[]>();

  useEffect(() => {
    fetch(baseUrl + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, [todos]);

  const onDelete = async (id: number) => {
    try {
      await fetch(baseUrl + "/todos/" + id, {
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
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="m-6 flex justify-center">
                <InputCard />
              </div>
              {todos?.map((todo) => {
                return (
                  <div key={todo.id} className="flex justify-center">
                    <TodoCard todo={todo} onDelete={onDelete}></TodoCard>
                  </div>
                );
              })}
            </>
          }
        ></Route>
        <Route path="/:id" element={<TodoDetail onDelete={onDelete} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
