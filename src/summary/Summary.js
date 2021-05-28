import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { getAllGrades } from "../api/ChecklistService";
import { formatGrade } from "../service/Formater";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: 30,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
  },
  topicCard: {
    marginTop: 10,
    marginBottom: 30,
  },
  requirementText: {
    marginTop: 25,
    marginBottom: 10,
  },
  grid: {
    width: 1850,
  },
  theme: {
    marginBottom: 10,
  },
}));

function Summary(props) {
  const classes = useStyles();
  const [serviceInfoList, setServiceInfoList] = useState([]);

  const loadServices = () =>
    getAllGrades().then((values) => {
      const data = values.data;
      data.sort((a, b) => b.grade - a.grade);
      setServiceInfoList(data);
    });

  useEffect(() => {
    loadServices();
  }, []);

  if (serviceInfoList.length == 0) return <h2>loading...</h2>;

  return (
    <Grid container className={classes.grid} spacing={3}>
      {serviceInfoList.map((serviceInfo) => (
        <Grid item xs={4}>
          <ServiceInfo serviceInfo={serviceInfo} />
        </Grid>
      ))}
    </Grid>
  );
}

function ServiceInfo(props) {
  const classes = useStyles();
  const { serviceInfo } = props;
  return (
    <Paper className={classes.paper} href="#">
      <Grid container className={classes.grid} spacing={1}>
        <Grid item xs={2}>
          <Typography variant="h4" component="h1">
            {serviceInfo.repo}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Nota: {formatGrade(serviceInfo.grade)}
            <br />
            <Link href={"service/" + serviceInfo.repo}>Link</Link>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          {serviceInfo.themesHeader.map((theme) => (
            <div className={classes.theme}>
              <Typography variant="h5" component="h1">
                {theme.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Nota: {formatGrade(theme.grade)}
              </Typography>
            </div>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Summary;
