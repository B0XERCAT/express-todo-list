import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { baseUrl } from "../../src/vars";
import { useState } from "react";

export default function InputCard() {
  const [todo, setTodo] = useState<string>("");

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await fetch(baseUrl + "/todo/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Date.now(),
          title: todo,
        }),
      }).then((res) => {
        if (res.status === 201) {
          console.log("Success");
        }
        setTodo("");
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card className="w-[500px]">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle className="text-center">Add your tasks</CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex justify-center">
          <Input
            placeholder="Enter Title"
            className="w-11/12"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            className="bg-blue-500 w-[100px] text-base font-semibold"
            type="submit"
            {...(todo === "" && { disabled: true })}
          >
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
