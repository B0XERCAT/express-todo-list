import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Todo } from "../lib/types";
import { baseUrl } from "../../src/vars";
import { Badge } from "./ui/badge";
import EditCard from "./EditCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  onDelete: (id: number) => Promise<void>;
}

export default function TodoDetail({ onDelete }: Props) {
  const id = useParams().id;
  const [todo, setTodo] = useState<Todo>();
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(baseUrl + "/todos/" + id)
      .then((res) => res.json())
      .then((data) => setTodo(data));
  }, [todo]);

  return (
    <>
      {showEdit && (
        <div className="flex justify-center mt-6">
          <EditCard id={id!} setShowEdit={setShowEdit} />
        </div>
      )}
      <div className="flex justify-center mt-8">
        <div className="w-[800px] ">
          <div className="flex justify-between px-10 w-[800px]">
            <div className="flex gap-4 items-center">
              <div>
                <Badge
                  variant={
                    (todo?.status.toString() as "Not Started") ||
                    "In Progress" ||
                    "Done"
                  }
                >
                  {todo?.status}
                </Badge>
              </div>
              <p className="text-2xl font-medium">{todo?.title}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    setShowEdit(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onDelete(todo!.id);
                    navigate("/");
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <hr className="mt-4 mb-8" />
          <div className="px-10">
            <p className="leading-6">{todo?.desc}</p>
          </div>
        </div>
      </div>
    </>
  );
}
