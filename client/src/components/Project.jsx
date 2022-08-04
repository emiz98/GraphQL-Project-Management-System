import { BsClock } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import TimeAgo from "react-timeago";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../graphQL/mutations";
import { GET_PROJECTS } from "../graphQL/queries";
import EditProject from "./EditProject";

const Project = ({
  id,
  title,
  description,
  createdAt,
  client,
  status,
  updatedAt,
  setDescriptionModal,
}) => {
  const [menu, setMenu] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

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
      className={`bg-white h-fit  rounded-md p-5 shadow-md ${
        status == "Not Started" && "hover:border-notReady"
      }
      ${status == "In Progress" && "hover:border-inProgress"} ${
        status == "In Review" && "hover:border-inReview"
      }
      ${
        status == "Completed" && "hover:border-Completed"
      }  border-2 transitionClass`}
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
            <span
              onClick={() => {
                setMenu(false);
                setEditModal(true);
              }}
              className="px-6 py-1 hover:bg-green-200 cursor-pointer rounded-t-lg"
            >
              Edit
            </span>
            <span
              onClick={() => {
                setDeleteModal(true);
                setMenu(false);
              }}
              className="px-6 py-1 hover:bg-red-200 cursor-pointer rounded-b-lg"
            >
              Delete
            </span>
          </div>
        )}
      </div>
      <div className="my-5">
        <h3
          onClick={() =>
            setDescriptionModal({
              isActive: true,
              data: {
                title,
                description,
                createdAt,
                updatedAt,
                status,
                client,
              },
            })
          }
          className="font-medium text-lg hover:underline"
        >
          {title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
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
      {editModal && <EditProject id={id} setEditModal={setEditModal} />}
      {deleteModal && (
        <div
          className="h-screen w-screen absolute top-0 left-0 overflow-hidden z-50 
    backdrop-blur-sm flex flex-col items-center justify-center"
        >
          <div className="rounded-lg relative bg-gray-50 shadow-md px-10 py-5 flex flex-col items-center justify-center">
            <h2 className="text-lg font-medium">Delete {title}</h2>
            <h4 className="text-sm mb-5">
              Are you want to delete this project?
            </h4>
            <div className="flex items-center gap-x-2">
              <button
                onClick={() => setDeleteModal(false)}
                className="btnSecondary"
              >
                Cancel
              </button>
              <button onClick={deleteProject} className="btnPrimary">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
