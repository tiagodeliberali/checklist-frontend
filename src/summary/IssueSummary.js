import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getIndexedIssues, getChecklist } from "../api/ChecklistService";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Chip from "@material-ui/core/Chip";
import { formatGrade } from "../service/Formater";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    height: 300,
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
    width: 1870,
  },
  theme: {
    marginBottom: 10,
  },
  lastLine: {
    marginBottom: 10,
  },
}));

function IssueSummary(props) {
  const classes = useStyles();
  const [summaryList, setSummaryList] = useState([]);

  const loadIssues = () => {
    const checklistPromise = getChecklist();
    const indexesPromise = getIndexedIssues();

    Promise.all([checklistPromise, indexesPromise]).then((results) => {
      const checklist = results[0].data;
      const issues = results[1].data;
      const arrayData = [];

      checklist.themes.map((theme) =>
        theme.topics.map((topic) =>
          topic.requirements.map((requirement) => {
            const services = issues[requirement.id] || [];
            services.sort();
            arrayData.push({
              theme: theme.name,
              topic: topic.name,
              requirement: requirement.name,
              weight: theme.weight * topic.weight,
              grade: formatGrade(requirement.grade),
              services: services,
            });
          })
        )
      );

      arrayData.sort(
        (a, b) => b.weight * 100 + b.grade - (a.weight * 100 + a.grade)
      );
      setSummaryList(arrayData);
    });
  };

  useEffect(() => {
    loadIssues();
  }, []);

  return (
    <Grid container className={classes.grid} spacing={3}>
      {summaryList.map((issueInfo) => (
        <Grid item xs={4}>
          <IssueInfo issueInfo={issueInfo} />
        </Grid>
      ))}
    </Grid>
  );
}

function IssueInfo(props) {
  const classes = useStyles();
  const { issueInfo } = props;
  return (
    <Paper className={classes.paper} href="#">
      <Grid container className={classes.grid} spacing={1}>
        <Grid item xs={3}>
          <Typography variant="h4" component="h1">
            {issueInfo.theme}
          </Typography>
          <Typography variant="h5" component="h2">
            {issueInfo.topic}
          </Typography>
          <Typography variant="overline" component="h3">
            Peso: {issueInfo.weight} / Nota: {issueInfo.grade}
          </Typography>
          <Typography variant="subtitle1" className={classes.lastLine}>
            {issueInfo.requirement}
          </Typography>
          {issueInfo.services.map((service) => (
            <Link href={"/service/" + service}>
              <Chip label={service} />
            </Link>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default IssueSummary;
