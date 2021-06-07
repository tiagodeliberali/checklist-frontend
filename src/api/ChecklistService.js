const axios = require("axios");
const baseUrl = "http://localhost:8080/";
const checklistName = "checklist-v2"

export const addTopic = (serviceName, topicId) => {
  const url = `${baseUrl}service/${serviceName}/${topicId}`;

  return axios.put(url).catch((error) => console.log(error));
};

export const addRequirement = (serviceName, topicId, requirementId) => {
  const url = `${baseUrl}service/${serviceName}/${topicId}/${requirementId}`;

  return axios.put(url).catch((error) => console.log(error));
};

export const removeRequirement = (serviceName, topicId, requirementId) => {
  const url = `${baseUrl}service/${serviceName}/${topicId}/${requirementId}`;

  return axios.delete(url).catch((error) => console.log(error));
};

export const getGrade = (serviceName) => {
  const url = `${baseUrl}grade/${checklistName}/${serviceName}`;

  return axios.get(url).catch((error) => console.log(error));
};

export const getAllGrades = () => {
  const url = `${baseUrl}grade/${checklistName}/all`;

  return axios.get(url).catch((error) => console.log(error));
};

export const getIndexedIssues = () => {
  const url = `${baseUrl}index/`;

  return axios.get(url).catch((error) => console.log(error));
};

export const getChecklist = () => {
  const url = `${baseUrl}checklist/${checklistName}`;

  return axios.get(url).catch((error) => console.log(error));
};

export const createService = (repo) => {
  const url = `${baseUrl}service/${repo}`;

  return axios.put(url).catch((error) => console.log(error));
};
