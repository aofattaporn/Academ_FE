import { Menu, MenuItem } from "@mui/material";
import { Process } from "../../types/ProjectType";

type ProcessDropdownProps = {
  processId: string;
  allProcess: Process[];
  anchorElUser: HTMLElement | null;
  handleSetAnchorElUser: (element: null | HTMLElement) => void;
  handleSelectProcess: (selectProcess: string) => void;
};

const ProcessDropdown = ({
  processId,
  allProcess,
  anchorElUser,
  handleSetAnchorElUser,
  handleSelectProcess,
}: ProcessDropdownProps) => {
  const process = allProcess.find((items) => items.processId === processId);
  return (
    <div className=" grid grid-cols-3 gap-4 items-center">
      <p className="bg-main py-2 flex justify-center rounded-md">Process</p>
      <p
        style={{ backgroundColor: process?.processColor }}
        className="col-span-2 flex justify-center h-full items-center text-white rounded-md hover:cursor-pointer"
        id={"Process"}
        onClick={(e) => handleSetAnchorElUser(e.currentTarget)}
      >
        {process?.processName}
      </p>

      <Menu
        id="Process"
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser) && anchorElUser?.id === "Process"}
        onClose={() => handleSetAnchorElUser(null)}
      >
        {allProcess
          ? allProcess.map((process, index) => (
              <MenuItem
                key={index}
                className="flex w-full bg-black"
                onClick={() => handleSelectProcess(process.processId)}
              >
                <div className="flex items-center gap-4">
                  <div
                    style={{ backgroundColor: process.processColor }}
                    className="w-4 h-4  rounded-full"
                  ></div>
                  <p>{process.processName}</p>
                </div>
              </MenuItem>
            ))
          : null}
      </Menu>
    </div>
  );
};

export default ProcessDropdown;
