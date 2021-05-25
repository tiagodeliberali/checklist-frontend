import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
    dialog: {
        width: 400,
        paddingTop: 30,
        paddingBottom: 50,
        paddingLeft: 30,
        paddingRight: 30,
    }
}));

function AddService(props) {
    const { onClose, open, reload } = props;
    const classes = useStyles();
    const [repo, setRepo] = useState("");

    const handleClose = () => {
        onClose();
    };

    const handleCreate = () => {
        const url = 'http://localhost:8080/service/' + repo;

        axios.put(url)
        .then(function () {
            reload();
            onClose();
        })
        .catch(function (error) {
            console.log(error);
            onClose();
        })
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Criar serviço</DialogTitle>
            <div className={classes.dialog}>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <TextField id="standard-basic" label="Nome do repositório" onChange={e => setRepo(e.target.value)} />
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="contained" onClick={handleCreate}>Criar</Button>
                    </Grid>
                </Grid>
            </div>
        </Dialog>
    );
}

export default AddService;