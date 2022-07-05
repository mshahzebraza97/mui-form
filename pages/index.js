import Layout from '../components/HOC/Layout'
import Section from '../components/HOC/Section'
import Typography from '@mui/material/Typography'
import { Button, Link as MuiLink, Grid } from '@mui/material'
import NextLink from 'next/link';


export default function Home() {
    return (

        <Layout>
            <Section id="Welcome"  >


                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"

                >
                    <Grid item xs={12} textAlign='center'>
                        <Typography variant="body" color="initial">
                            Kindly visit the form and feel free to use the code or contribute to the project.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <NextLink href='/form' >
                            <Button variant='contained' >
                                Go To Form
                            </Button>
                        </NextLink>
                    </Grid>

                    <Grid item>
                        <NextLink href='https://github.com/mshahzebraza97/mui-form' >
                            <Button variant='contained' color='success' >
                                Go To Repository
                            </Button>
                        </NextLink>
                    </Grid>
                </Grid>



            </Section>
        </Layout>

    )
}



