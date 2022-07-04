import { Typography } from '@mui/material';
import React from 'react'
import styles from './Section.module.scss';


function Section({ children, id, title, classes = [styles.section], contain = true }) {
    const concatClasses = contain
        ? classes.concat([styles.container])
        : classes;

    return (
        <section className={concatClasses.join(' ')} id={id}>
            {id && <Typography variant="h2" component="h2" align='center' marginBottom={5} >
                {title?.toUpperCase() || id.toUpperCase()}
            </Typography>}
            {children}
        </section>
    )
}

export default Section