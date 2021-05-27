import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import GradeDetail from "./GradeDetail";
import { useParams } from "react-router-dom";
import { getGrade } from "../api/ChecklistService";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 1500,
    paddingTop: 30,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
  },
  searchGrid: {
    flexGrow: 1,
  },
}));

const handleGetGrade = (service, checklist, setServiceGrade) => {
  getGrade(service, checklist).then((response) =>
    setServiceGrade(response.data)
  );
};

function Grade(props) {
  const [serviceGrade, setServiceGrade] = useState({});
  const classes = useStyles();

  const { serviceName } = useParams();
  const { setSelectedService } = props;

  setSelectedService(serviceName);

  const reload = () => {
    handleGetGrade(serviceName, "checklist", setServiceGrade);
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <Paper className={classes.paper}>
      <GradeDetail data={serviceGrade} name={serviceName} reload={reload} />
    </Paper>
  );
}

export default Grade;
