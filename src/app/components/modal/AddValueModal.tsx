"use client"
import { useEffect, useState } from 'react';
import './styles.css';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';


type modalAddProp = {
    defaultValue?: {
        name: string,
        email: string,
        image: string,
        id?: string | number
    },
    btnText?: string,
    headerText?: string,
    onClose?: () => void,
    onSubmit?: (data: {
        name?: string,
        email?: string,
        image?: string,
        id?: string | number,
    }) => void,
    showModal: boolean,
}
const AddValueModal = ({
    defaultValue,
    btnText = "Edit",
    headerText = "Edit",
    showModal = true,
    onClose,
    onSubmit,
}: modalAddProp) => {
    const [name, setName] = useState<string | undefined>(defaultValue?.name);
    const [email, setEmail] = useState<string | undefined>(defaultValue?.email);
    const [image, setImage] = useState<string | undefined>(defaultValue?.image);

    return (
        <Dialog onClose={onClose} open={showModal}>
            {/* header */}
            <div className='modalHeader'>
                <img
                    src='modalHeader.png'
                />
                <IconButton aria-label="delete" id='btnCloseModal'
                    onClick={onClose}
                >
                    <Close />
                </IconButton>
                <h3>{headerText}</h3>
            </div>
            {/* body */}

            <form className='modalBody'
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit && onSubmit({ name, email, image, id: defaultValue?.id });
                    setEmail('');
                    setName('');
                    setImage(undefined);
                }}
            >
                <input
                    type='text'
                    required
                    placeholder='Enter name'
                    value={name!}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <input
                    type='email'
                    required
                    value={email!}
                    placeholder='Enter email'
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />
                <div className='imgUploadRow'>
                    <label className="label txtName" style={{ fontSize: 11 }}>
                        <input type="file" required 
    
                            onChange={(e) => {
                                setImage(URL.createObjectURL(e.target.files[0]))
                            }}
                        />
                        Upload Photo
                    </label>

                    <div className='txtName imgUrl'>{image}</div>
                </div>
                <Button
                    type='submit'
                    variant="contained"
                    className='Button'
                    size='small'
                    sx={{
                        height: 22,
                        marginTop: 3,
                        display: 'flex',
                        // fontSize:9
                    }}
                >
                    {btnText}
                </Button>
            </form>

        </Dialog>
    );
}

export default AddValueModal