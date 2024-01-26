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
import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";
import { Todo } from "../lib/types";
import { Textarea } from "./ui/textarea";

export default function EditCard({
  id,
  setShowEdit,
}: {
  id: string;
  setShowEdit: (showEdit: boolean) => void;
}) {
  const [todo, setTodo] = useState<Todo>();
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    fetch(baseUrl + "/todos/" + id)
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
        setTitle(data.title);
        setDesc(data.desc);
        setStatus(data.status);
      });
  }, [id]);

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await fetch(baseUrl + "/todos/" + todo!.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          desc: desc,
          status: status,
        }),
      }).then((res) => {
        if (res.status === 201) {
          console.log("Success");
        }
        setShowEdit(false);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card className="w-[500px]">
      <div className="flex justify-end">
        <Button
          variant={"ghost"}
          onClick={() => {
            setShowEdit(false);
          }}
        >
          X
        </Button>
      </div>
      <form onSubmit={onSubmit}>
        <CardHeader className="pt-0">
          <CardTitle className="text-center text-blue-950/80">
            Edit your Todo
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 flex justify-center">
          <div className="flex-col gap-10 w-11/12">
            <div className="flex justify-center gap-2 mb-2">
              <Badge
                variant={"Not Started"}
                onClick={() => {
                  setStatus("Not Started");
                }}
                className={cn(status != "Not Started" && "bg-blue-200")}
              >
                Not Started
              </Badge>
              <Badge
                variant={"In Progress"}
                onClick={() => {
                  setStatus("In Progress");
                }}
                className={cn(status != "In Progress" && "bg-slate-200")}
              >
                In Progress
              </Badge>
              <Badge
                variant={"Done"}
                onClick={() => {
                  setStatus("Done");
                }}
                className={cn(status != "Done" && "bg-green-200")}
              >
                Done
              </Badge>
            </div>
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
        <CardFooter className="mt-4 flex justify-center">
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
