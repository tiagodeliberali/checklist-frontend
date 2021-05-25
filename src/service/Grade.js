import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GradeDetail from './GradeDetail';
import { useParams } from "react-router-dom";

const axios = require('axios');

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
    }
}));

const getGrade = (service, checklist, setServiceGrade) => {
    const url = 'http://localhost:8080/grade/' + checklist + '/' + service;

    axios.get(url)
        .then(function (response) {
            console.log(response);
            setServiceGrade(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function Grade() {
    const [serviceGrade, setServiceGrade] = useState({});

    let { serviceName } = useParams();

    const classes = useStyles();

    const reload = () => {
        getGrade(serviceName, "checklist", setServiceGrade)
    }

    useEffect(() => {
        reload();
    }, []);

    return (
        <Paper className={classes.paper}>
            <GradeDetail data={serviceGrade} name={serviceName} reload={reload} />
        </Paper>);
}

export default Grade;