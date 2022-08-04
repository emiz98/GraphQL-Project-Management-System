import Project from "./Project";
import { BsChevronDoubleDown } from "react-icons/bs";
import ProjectDetail from "./ProjectDetail";
import { useState } from "react";

const ProjectCol = ({ title, color, projects }) => {
  const [descriptionModal, setDescriptionModal] = useState({
    isActive: false,
    data: null,
  });

  return (
    <div className="group">
      <div
        className="flex items-center h-12 gap-x-6 text-lg font-medium 
      bg-white rounded-md shadow-sm mb-6"
      >
        <div
          style={{ backgroundColor: color }}
          className="w-2 h-full rounded-l-md"
        />
        <span>{title}</span>
      </div>
      <div
        className="grid grid-cols-1 gap-y-2 h-[50vh] md:h-[60vh] 3xl:h-[65vh] overflow-y-scroll
      scrollbar-hide pb-5"
      >
        {projects?.map(
          ({ id, name, description, createdAt, updatedAt, status, client }) => (
            <Project
              key={id}
              id={id}
              title={name}
              description={description}
              createdAt={createdAt}
              client={client}
              status={status}
              updatedAt={updatedAt}
              setDescriptionModal={setDescriptionModal}
            />
          )
        )}
      </div>
      <BsChevronDoubleDown className="hidden group-hover:lg:inline-block animate-bounce text-center text-[#2b85b9] w-full mt-2" />
      {descriptionModal.isActive && (
        <ProjectDetail
          descriptionModal={descriptionModal}
          setDescriptionModal={setDescriptionModal}
        />
      )}
    </div>
  );
};

export default ProjectCol;
