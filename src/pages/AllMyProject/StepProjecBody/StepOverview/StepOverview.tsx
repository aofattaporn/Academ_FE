import { useSelector } from "react-redux";
import CreateProjectButtonComp from "../../../../components/Button/CreateProjectButtonComp";
import { RootState } from "../../../../stores/store";
import SummaryInviteShare from "./SummaryInviteShare";
import SummaryProjectName from "./SummaryProjectName";
import SummaryViews from "./SummaryViews";
import { useMutation } from "react-query";
import projectApi from "../../../../libs/projectApi";
import { useNavigate } from "react-router-dom";
import { BTN_CREATE_PROJECT } from "../../../../types/ProjectType";

const StepOverview = () => {
  const project = useSelector((state: RootState) => state.createProject);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: projectApi.createProject,
  });

  if (mutation.isSuccess) navigate(0);

  return (
    <>
      <div className="bg-main mt-6 px-8 py-4 font-roboto ">
        <SummaryProjectName
          projectName={project.projectName}
          avatarColor={project.avatarColor}
        />
        <SummaryViews views2={project.selectedViews} />
        <SummaryInviteShare invites={project.invitedUsers} />
      </div>
      <div className="bg-main mt-6">
        <CreateProjectButtonComp
          title={BTN_CREATE_PROJECT}
          disable={false}
          handleChange={() =>
            mutation.mutate({
              projectProfile: {
                projectName: project.projectName,
                avatarColor: project.avatarColor,
              },
              projectStartDate: new Date(),
              projectEndDate: new Date(),
              views: project.selectedViews,
              inviteRequests: project.invitedUsers,
            })
          }
        />
      </div>
    </>
  );
};

export default StepOverview;
