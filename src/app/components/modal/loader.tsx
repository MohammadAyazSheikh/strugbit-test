"use client"
import './styles.css';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
type modalAddProp = {
    showLoader: boolean,
}
const Loader = ({
    showLoader,
}: modalAddProp) => {

    return (
        <Dialog open={showLoader}>
            <div style={{
                padding: 20, display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center'
            }}>
                <CircularProgress
                    color='primary'
                    size={"small"}
                />
                Loading...
            </div>
        </Dialog>
    );
}

export default Loader