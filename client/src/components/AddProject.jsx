import { AiOutlineClose } from "react-icons/ai";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS, GET_PROJECTS } from "../graphQL/queries";
import { ADD_PROJECT } from "../graphQL/mutations";
import { useState } from "react";

const AddProject = ({ setProjectModal }) => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const [form, setForm] = useState({
    name: "",
    description: "",
    clientId: null,
  });
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name: form.name,
      description: form.description,
      clientId: form.clientId,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
    },
  });

  const handleForm = ({ currentTarget: input }) => {
    setForm({ ...form, [input.name]: input.value });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    addProject();
    setProjectModal(false);
  };

  return (
    <div
      className="h-screen w-screen absolute top-0 left-0 overflow-hidden z-50 
    backdrop-blur-sm flex flex-col items-center justify-center"
    >
      <div className="p-5 rounded-lg relative bg-gray-50 shadow-md md:w-96">
        <div className="flex items-center justify-between pb-6">
          <h2 className="text-lg font-medium">Edit project</h2>
          <AiOutlineClose
            onClick={() => setProjectModal(false)}
            className="border-2 p-1 h-8 w-8 rounded-full border-black hover:bg-gray-300 cursor-pointer"
          />
        </div>

        <form onSubmit={handleAddProject} className="flex flex-col gap-y-2">
          <input
            required
            onChange={handleForm}
            className="px-5 py-2 rounded-lg"
            type="text"
            name="name"
            placeholder="Project Name"
          />
          <textarea
            required
            onChange={handleForm}
            className="px-5 py-2 rounded-lg"
            name="description"
            placeholder="Project Description"
            cols="30"
            rows="5"
          />
          <div className="flex flex-col gap-y-1 mt-3">
            <span className="text-sm">Assign Client</span>
            <select
              required
              name="clientId"
              className="px-4 py-2 rounded-lg mb-1 outline-none bg-white"
              onChange={handleForm}
            >
              <option defaultChecked>Select a client</option>
              {!loading &&
                !error &&
                data?.clients.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
            </select>
          </div>
          <button className="btnPrimary mt-2">Add Project</button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
