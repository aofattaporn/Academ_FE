import { Link, useLocation } from "react-router-dom";
import AvatarProject from "../../../components/AvatarProject/AvatarProject";
import { PROJECT_SETTING, Project, Size } from "../../../types/ProjectType";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import TuneIcon from "@mui/icons-material/Tune";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArchiveIcon from "@mui/icons-material/Archive";
import PeopleIcon from "@mui/icons-material/People";
import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../../stores/modalSlice/modalSlice";
import SettingProjectDetails from "./SettingModal/SettingProjectDetails";
import ManageProjectPermissions from "./SettingModal/ManageProjectPermissions";

type ProjectInfoProps = {
  projectData: Project;
};

const ProjectInfo = ({ projectData }: ProjectInfoProps) => {
  const { projectProfile, views } = projectData.projectInfo;
  const location = useLocation();
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const renderViews = () => {
    return views.map((view, index) => (
      <Link
        to={view}
        key={index}
        className={`w-24 flex justify-center cursor-pointer
          ${index === 0 ? "rounded-tl-md" : "rounded-none"}
          ${index === views.length - 1 ? "rounded-tr-md" : "rounded-none"}
          ${
            location.pathname.includes(view)
              ? "bg-primary text-white"
              : "bg-primary-subtle"
          }
        `}
      >
        {view}
      </Link>
    ));
  };

  const handleOpenTasksDetails = () => {
    setAnchorElUser(null);
    dispatch(
      openModal({
        title: PROJECT_SETTING.PROJECR_DETAILS,
        children: <SettingProjectDetails />,
      })
    );
  };

  const handleOpenProjectPermissions = () => {
    setAnchorElUser(null);
    dispatch(
      openModal({
        title: PROJECT_SETTING.MANAGE_PROJECT_PERMISSIONS,
        children: <ManageProjectPermissions />,
      })
    );
  };

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-4 pt-2">
        <AvatarProject
          projectName={projectProfile.projectName}
          color={projectProfile.avatarColor}
          size={Size.medium}
          isLoading={false}
        />

        <div>
          <div className="flex gap-4 items-center">
            <h2 className="text-xl font-bold">{projectProfile.projectName}</h2>

            <Box>
              <IconButton onClick={handleOpenUserMenu}>
                <ExpandMoreIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleOpenTasksDetails}>
                  <ListItemIcon>
                    <ModeEditOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit project Details</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleOpenProjectPermissions}>
                  <ListItemIcon>
                    <TuneIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Manage Project Permissions</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <ArchiveIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <DeleteOutlineIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText> Delete Project</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </div>
          <div className="flex gap-1 mt-2">{renderViews()}</div>
        </div>
      </div>

      <div>
        <Button
          startIcon={<PeopleIcon />}
          size="medium"
          sx={{
            textTransform: "none",
            borderColor: "#AF8AE2",
            color: "#AF8AE2",
            "&:hover": {
              color: "#FFFFF",
              borderColor: "#AF8AE2",
            },
          }}
          variant="outlined"
        >
          Share
        </Button>
      </div>
    </div>
  );
};

export default ProjectInfo;
