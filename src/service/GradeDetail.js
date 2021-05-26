import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    searchGrid: {
        flexGrow: 1,
    },
    topicCard: {
        marginTop: 10,
        marginBottom: 30,
    },
    requirementText: {
        marginTop: 25,
        marginBottom: 10,
    }
}));

const formatGrade = (grade) => {
    return Math.round((grade + Number.EPSILON) * 10 * 100) / 100;
}

function GradeDetail(props) {
    const classes = useStyles();
    const { data, name, reload } = props;

    if (!('grade' in data)) {
        return (
            <Typography variant="h5" component="h2">
                loading...
            </Typography>
        )
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h2" component="h2">
                    {name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Nota: {formatGrade(data.grade)}
                </Typography>
            </Grid>
            {data.themesInfo.map(theme => (
                <Grid item xs={4}>
                    <Typography variant="h4" component="h2">
                        {theme.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Nota: {formatGrade(theme.grade)}
                        <br />Peso: {theme.weight}
                    </Typography>

                    {theme.topicsInfo.map(topic => (
                        <TopicInfo data={topic} serviceName={name} reload={reload} />
                    ))}
                </Grid>
            ))}
        </Grid>
    );
}

function TopicInfo(props) {
    const classes = useStyles();
    const topic = props.data;
    const { serviceName, reload } = props;

    const addTopic = () => {
        const url = 'http://localhost:8080/service/' + serviceName + '/' + topic.id;

        axios.put(url)
            .then(function () {
                reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Card className={classes.topicCard}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {topic.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Nota: {formatGrade(topic.grade)}
                    <br />Peso: {topic.weight}
                    {topic.missing && <div><Link href="#" onClick={addTopic}>Adicionar</Link></div>}
                </Typography>
                <RequirementInfo
                    missed={topic.missedRequirements}
                    unused={topic.unusedRequirements}
                    serviceName={serviceName}
                    topicId={topic.id}
                    reload={reload} />
            </CardContent>
        </Card>
    )
}

function RequirementInfo(props) {
    const classes = useStyles();
    const {
        missed,
        unused,
        serviceName,
        topicId,
        reload } = props;

    const addRequirement = (requirementId) => {
        const url = 'http://localhost:8080/service/' + serviceName + '/' + topicId + '/' + requirementId;

        axios.put(url)
            .then(function (response) {
                reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const removeRequirement = (requirementId) => {
        const url = 'http://localhost:8080/service/' + serviceName + '/' + topicId + '/' + requirementId;

        axios.delete(url)
            .then(function (response) {
                reload();
            });
    }

    return (
        <Typography variant="body2" component="p">
            <div>
                <br />
                {missed.map(req => (
                    <Chip
                        label={req.name}
                        onDelete={() => removeRequirement(req.id)}
                    />
                ))}
            </div>
            <Typography className={classes.requirementText} variant="body2" component="p">
                Possíveis pendências:
            </Typography>
            <div>
                {unused.map(req => (
                    <Chip
                        label={req.name}
                        onDelete={() => addRequirement(req.id)}
                        deleteIcon={<AddCircleOutlineIcon />}
                    />
                ))}
            </div>
        </Typography>
    )
}

export default GradeDetail;
