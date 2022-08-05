import { useQuery } from "@apollo/client";
import { useState } from "react";
import AddClient from "./components/AddClient";
import AddProject from "./components/AddProject";
import Header from "./components/Header";
import ProjectCol from "./components/ProjectCol";
import { GET_PROJECTS } from "./graphQL/queries";
import { groupProjects } from "./utils/utils";
import { BsChevronRight } from "react-icons/bs";
import ViewClients from "./components/ViewClients";
import { ADD_PROJECT } from "./graphQL/mutations";

function App() {
  const [projectModal, setProjectModal] = useState(false);
  const [clientModal, setClientModal] = useState(false);
  const [clientsModal, setClientsModal] = useState(false);

  const { loading, error, data } = useQuery(GET_PROJECTS);

  return (
    <div className="lg:w-screen lg:h-screen bg-white overflow-hidden">
      <Header />
      <main className="h-screen p-5 md:p-10 bg-gray-100 !pt-24 overflow-y-scroll lg:overflow-hidden scroll-smooth">
        <div className="flex flex-col md:flex-row items-start gap-y-2 md:items-center justify-between">
          <div
            onClick={() => setClientsModal(true)}
            className="flex items-center gap-x-2 font-medium text-lg hover:text-primary transitionClass"
          >
            <h2 className="">View Clients</h2>
            <BsChevronRight className="h-4 w-4" />
          </div>
          <div className="gap-x-2 flex">
            <button
              onClick={() => setProjectModal(true)}
              className="btnSecondary"
            >
              Add Project
            </button>
            <button onClick={() => setClientModal(true)} className="btnPrimary">
              Add Client
            </button>
          </div>
        </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 lg:gap-5 gap-y-10">
            <div>
              <ProjectCol
                title="Not Ready"
                color="#df5454"
                projects={groupProjects(data.projects)["Not Started"]}
              />
            </div>

            <div>
              <ProjectCol
                title="In Progress"
                color="#ffb223"
                projects={groupProjects(data.projects)["In Progress"]}
              />
            </div>

            <div>
              <ProjectCol
                title="In Review"
                color="#5b7deb"
                projects={groupProjects(data.projects)["In Review"]}
              />
            </div>

            <div>
              <ProjectCol
                title="Completed"
                color="#24cb61"
                projects={groupProjects(data.projects)["Completed"]}
              />
            </div>
          </div>
        )}
      </main>
      {projectModal && <AddProject setProjectModal={setProjectModal} />}
      {clientModal && <AddClient setClientModal={setClientModal} />}
      {clientsModal && <ViewClients setClientsModal={setClientsModal} />}
    </div>
  );
}

export default App;
