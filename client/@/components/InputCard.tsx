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
import { Textarea } from "./ui/textarea";

export default function InputCard() {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await fetch(baseUrl + "/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Date.now(),
          title: title,
          desc: desc,
        }),
      }).then(() => {
        setTitle("");
        setDesc("");
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card className="w-[500px]">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle className="text-center text-blue-950/80">Add your tasks</CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex justify-center">
          <div className="flex-col gap-10 w-11/12">
            <Input
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Enter Description"
              className="h-[100px] mt-4"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            className="bg-blue-500 w-[100px] text-base font-semibold"
            type="submit"
            {...(title === "" && { disabled: true })}
          >
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
