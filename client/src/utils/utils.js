export const groupProjects = (projects) => {
  let result = projects.reduce(function (r, a) {
    r[a.status] = r[a.status] || [];
    r[a.status].push(a);
    return r;
  }, Object.create(null));
  return result;
};

export const removeObjInObjArr = (arr, obj) => {
  let removedArr = arr.filter((arrObj) => arrObj.id !== obj.id);
  return removedArr;
};

export const getStatusEnum = (statusString) => {
  let ENUM = STATUS.find((stat) => stat.title === statusString);
  return ENUM;
};

export const STATUS = [
  {
    id: 1,
    value: "new",
    title: "Not Started",
  },
  {
    id: 2,
    value: "progress",
    title: "In Progress",
  },
  {
    id: 3,
    value: "review",
    title: "In Review",
  },
  {
    id: 4,
    value: "completed",
    title: "Completed",
  },
];
