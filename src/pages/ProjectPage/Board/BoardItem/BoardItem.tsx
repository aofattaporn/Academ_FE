import moment from "moment";
import { Tasks } from "../../../../types/MyTasksType";
import { Avatar } from "@mui/material";

type BoardItem = {
  tasks: Tasks;
};

const BoardItem = ({ tasks }: BoardItem) => {
  return (
    <div className="bg-main w-full mt-4 p-4 shadow-3xl rounded-md hover:bg-gray-100 hover:cursor-pointer">
      <p>{tasks.tasksName}</p>

      <div className="flex justify-between items-center mt-4">
        <p className=" text-gray-300">{moment(tasks.dueDate).format("l")}</p>
        <Avatar alt={tasks.assignee} sx={{ width: 24, height: 24 }} />
      </div>
    </div>
  );
};

export default BoardItem;
