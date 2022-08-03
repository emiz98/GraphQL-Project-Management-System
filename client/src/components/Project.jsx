import { BsClock } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import TimeAgo from "react-timeago";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../graphQL/mutations";
import { GET_PROJECTS } from "../graphQL/queries";

const Project = ({ id, title, description, createdAt, client }) => {
  const [menu, setMenu] = useState(false);
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: id },
    // refetchQueries: [{ query: GET_PROJECTS }], //REFETCHING !NOT_GOOD
    update(cache, { data: { deleteProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: projects.filter(
            (project) => project.id !== deleteProject.id
          ),
        },
      });
    },
  });

  return (
    <div
      className="bg-white rounded-md p-5 shadow-md 
    hover:border-[#9fc5dc] border-2 transitionClass"
    >
      <div className="flex items-center justify-between relative select-none">
        <div className="flex items-center gap-x-2 text-sm">
          <BsClock />
          <span>
            <TimeAgo date={parseInt(createdAt)} />
          </span>
        </div>
        <div
          onClick={() => setMenu(!menu)}
          className="w-8 h-8 p-1 bg-gray-200 rounded-md flex border-2 hover:border-gray-500
        items-center justify-center hover:bg-gray-300 transitionClass cursor-pointer"
        >
          {menu ? (
            <AiOutlineClose className="text-gray-600" />
          ) : (
            <BiMenuAltRight className="text-gray-600" />
          )}
        </div>
        {menu && (
          <div className="flex flex-col rounded-lg bg-gray-100 absolute top-10 right-0 shadow-md">
            <span className="px-6 py-1 hover:bg-green-200 cursor-pointer rounded-t-lg">
              Edit
            </span>
            <span
              onClick={deleteProject}
              className="px-6 py-1 hover:bg-red-200 cursor-pointer rounded-b-lg"
            >
              Delete
            </span>
          </div>
        )}
      </div>
      <div className="my-5">
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <img
          className="h-10 w-10 rounded-full p-[2px] border-2 border-primary"
          src="user.png"
          alt="user"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{client?.name}</span>
          <span className="text-xs text-gray-600">{client?.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Project;
