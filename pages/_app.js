import "@fontsource/roboto"; // Defaults to weight 400.
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/globals.scss'
import { CssBaseline } from "@mui/material";



function MyApp({ Component, pageProps }) {
    return <CssBaseline>
        <Component {...pageProps} />
    </CssBaseline>
}

export default MyApp
