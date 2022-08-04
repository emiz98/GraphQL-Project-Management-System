import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { UPDATE_PROJECT } from "../graphQL/mutations";
import { GET_CLIENTS, GET_PROJECT, GET_PROJECTS } from "../graphQL/queries";
import { getStatusEnum, removeObjInObjArr, STATUS } from "../utils/utils";

const EditProject = ({ id, setEditModal }) => {
  const {
    loading: loadingClients,
    error: errorClients,
    data: dataClients,
  } = useQuery(GET_CLIENTS);

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "",
    clientId: null,
  });

  useEffect(() => {
    if (!loading)
      setForm({
        name: data?.project.name,
        description: data?.project.description,
        status: getStatusEnum(data?.project.status).value,
        clientId: data?.project.client.id,
      });
  }, [loading]);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: id,
      name: form.name,
      description: form.description,
      status: form.status,
      clientId: form.clientId,
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleForm = ({ currentTarget: input }) => {
    setForm({ ...form, [input.name]: input.value });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    console.log(form);
    updateProject();
    setEditModal(false);
  };

  return (
    <div
      className="h-screen w-screen absolute top-0 left-0 overflow-hidden z-50 
backdrop-blur-sm flex flex-col items-center justify-center"
    >
      <div className="p-5 rounded-lg relative bg-gray-100 shadow-md md:w-96">
        {loading || error ? (
          <div className="flex items-center justify-center h-[60vh]">
            <svg
              aria-hidden="true"
              className="mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-300 fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between pb-6">
              <h2 className="text-lg font-medium">Update project</h2>
              <AiOutlineClose
                onClick={() => setEditModal(false)}
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
                value={form.name}
                placeholder="Project Name"
              />
              <textarea
                required
                onChange={handleForm}
                className="px-5 py-2 rounded-lg"
                name="description"
                value={form.description}
                placeholder="Project Description"
                cols="30"
                rows="5"
              />
              <div className="flex flex-col gap-y-1 mt-3">
                <span className="text-sm">Status</span>
                <select
                  required
                  name="status"
                  className="px-4 py-2 rounded-lg mb-1 outline-none bg-white"
                  onChange={handleForm}
                >
                  <option
                    value={getStatusEnum(data.project.status).value}
                    defaultChecked
                  >
                    {data.project.status}
                  </option>
                  {STATUS.filter(
                    (stat) => stat.title != data.project.status
                  ).map(({ id, value, title }) => (
                    <option key={id} value={value}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-y-1 mt-3">
                <span className="text-sm">Assign Client</span>
                <select
                  required
                  name="clientId"
                  className="px-4 py-2 rounded-lg mb-1 outline-none bg-white"
                  onChange={handleForm}
                >
                  <option
                    key={data.project.client.id}
                    value={data.project.client.id}
                    defaultChecked
                  >
                    {data.project.client.name}
                  </option>
                  {!loadingClients &&
                    !errorClients &&
                    removeObjInObjArr(
                      dataClients.clients,
                      data.project.client
                    ).map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                </select>
              </div>
              <button className="btnPrimary mt-2">Update Project</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProject;
