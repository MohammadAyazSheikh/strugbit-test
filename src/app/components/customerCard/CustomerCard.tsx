"use client"
import './styles.css'
import Button from '@mui/material/Button';

type cardProp = {
    name: string,
    id: string | number;
    img: string,
    email: string,
    onDlt?: () => void,
    onEdit?: () => void
}
const AddValueModal = ({
    name,
    id,
    img,
    email,
    onDlt,
    onEdit
}: cardProp) => {

    return (
        <div className='cardContainer'>
            <img
                src={img}
                className='customerImg'
            />
            <p className='txtId'>
                {id}
            </p>
            <p className='txtName'>
                {name}
            </p>
            <p className='txtId'>
                {email}
            </p>
            {/* button */}
            <div className='btnRow'>
                <Button
                    variant="outlined"
                    size='small'
                    color='success'
                    sx={{
                        backgroundColor: 'rgba(57, 181, 74, 0.3)'
                    }}
                    onClick={onEdit}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    size='small'
                    color='error'
                    id='btnDlt'
                    sx={{

                        backgroundColor: 'rgba(216, 0, 0, 0.3)'
                    }}
                    onClick={onDlt}
                >
                    Delete
                </Button>
            </div>
            
        </div>
    );
}

export default AddValueModal