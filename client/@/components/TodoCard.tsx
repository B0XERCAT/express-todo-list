import { Button } from "./ui/button";
import { Todo } from "../lib/types";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

interface Props {
  todo: Todo;
  onDelete: (id: number) => Promise<void>;
}

export default function TodoCard({ todo, onDelete }: Props) {
  const title =
    todo.title.length > 22 ? todo.title.slice(0, 22) + "..." : todo.title;
  const navigate = useNavigate();
  const { toast } = useToast();
  return (
    <div
      className="w-[460px] rounded-none shadow-md pl-2 cursor-pointer hover:bg-slate-100"
      onClick={() => {
        navigate("/" + todo.id);
      }}
    >
      <div className="px-2 py-2 flex justify-between items-center">
        <div className="flex">
          <Badge
            variant={
              (todo.status.toString() as "Not Started") ||
              "In Progress" ||
              "Done"
            }
          >
            {todo.status}
          </Badge>
          <div className="mx-4" key={todo.id}>
            {title}
          </div>
        </div>
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            onDelete(todo.id);
            toast({
              description: "Your todo is deleted successfully.",
            });
            e.stopPropagation();
          }}
        >
          X
        </Button>
      </div>
    </div>
  );
}
