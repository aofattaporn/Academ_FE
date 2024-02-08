import { ReactNode, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import projectApi from "../../../../libs/projectApi";
import ProjectSideTile from "./ProjectSideTile/ProjectSideTile";
import RefreshIcon from "@mui/icons-material/Refresh";
import ToggleTitle from "./ToggleTitle/ToggleTitle";
import SeemoreButton from "./SeemoreButton/SeemoreButton";
import { ProjectList } from "../../../../types/ProjectType";

type ToggleItemProps = {
  title: string;
  icons: ReactNode;
  isOpen: boolean;
  navigate: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data?: ProjectList[];
  refetch: () => void;
};

const ToggleItem = ({
  icons,
  title,
  isOpen,
  navigate,
  isLoading,
  isSuccess,
  isError,
  refetch,
  data,
}: ToggleItemProps) => {
  const { projectId } = useParams();
  const [isCollapse, setIsCollapse] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setIsCollapse(false);
    }
  }, [isOpen, isCollapse]);

  return (
    <>
      <ToggleTitle
        handleCloseCollapse={() => setIsCollapse(!isCollapse)}
        icons={icons}
        isOpen={isOpen}
        title={title}
        isCollapse={isCollapse}
      />

      <div
        className={`overflow-scroll relative duration-100 mb-2 ${
          !isCollapse || !isOpen ? "h-0" : " h-auto"
        }`}
      >
        <SeemoreButton navigate={navigate} />
        {isLoading ? (
          <div
            className="p-4 flex cursor-pointer justify-between 
            animate-pulse w-full h-4 bg-gray-200 rounded-md"
          ></div>
        ) : null}
        {isSuccess
          ? data?.map((project, index) => (
              <ProjectSideTile
                key={index}
                title={title}
                projectId={project.projectId}
                projectName={project.projectName}
                isSelected={project.projectId === projectId}
              />
            ))
          : null}
        {isError ? (
          <div
            className="py-2 px-4 flex cursor-pointer 
              justify-between hover:text-primary"
            onClick={refetch}
          >
            <p className=" font-semibold">Try to Refresh</p>
            <RefreshIcon />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ToggleItem;