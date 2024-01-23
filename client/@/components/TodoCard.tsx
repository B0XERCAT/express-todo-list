import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Todo } from "../lib/types";
import { Checkbox } from "./ui/checkbox";

interface Props {
  todo: Todo;
  onCheck: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}
export default function TodoCard({ todo, onCheck, onDelete }: Props) {
  return (
    <Card className="w-[400px] rounded-none shadow-none">
      <CardContent className="px-2 py-2 flex justify-between items-center">
        <div className="flex">
          {todo.completed ? (
            <Checkbox
              onClick={(e) => {
                e.preventDefault();
                onCheck(todo.id);
              }}
              checked
            />
          ) : (
            <Checkbox
              onClick={(e) => {
                e.preventDefault();
                onCheck(todo.id);
              }}
            />
          )}
          <div className="mx-4" key={todo.id}>
            {todo.title}
          </div>
        </div>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="font-bold"
          onClick={() => {
            onDelete(todo.id);
          }}
        >
          X
        </Button>
      </CardContent>
    </Card>
  );
}
