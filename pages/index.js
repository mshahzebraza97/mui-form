import Layout from '../components/HOC/Layout'
import Section from '../components/HOC/Section'
import Typography from '@mui/material/Typography'

export default function Home() {
    return (

        <Layout>
            <Section id="homePage"   >
                <Typography variant="body1" >HomePage</Typography>
            </Section>
        </Layout>

    )
}



