"use client"
import './styles.css';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';


type modalAddProp = {
    showModal: boolean,
    onClose?: () => void,
    onDlt?: () => void
}
const DeleteModal = ({
    showModal,
    onClose,
    onDlt,
}: modalAddProp) => {

    return (
        <Dialog onClose={onClose} open={showModal}>
            {/* header */}
            <IconButton aria-label="delete" id='btnCloseModal'
                onClick={onClose}
            >
                <Close />
            </IconButton>
            {/* body */}
            <div className='dltModalBody'>
                <img
                    src='dltIcon.svg'
                    className='dltIcon'
                />
                <h4>Are you sure?</h4>
                <p style={{ marginTop: 12 }}>
                    Do you really want to delete this customer?
                </p>
                <p>
                    This process can not be undone.
                </p>
                {/* buttons */}
                <div className={'btnRowModal'}>
                    <Button
                        variant="contained"
                        id='btnClose'
                        size='small'
                        sx={{
                            height: 25,
                            fontSize: 9
                        }}
                        onClick={onClose}
                    >
                        CANCEL
                    </Button>
                    <Button
                        variant="contained"
                        id='btnDltModal'
                        size='small'
                        sx={{
                            height: 25,
                            fontSize: 9
                        }}
                        onClick={onDlt}
                    >
                        DELETE
                    </Button>
                </div>
            </div>


        </Dialog>
    );
}

export default DeleteModal