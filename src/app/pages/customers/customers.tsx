"use client"
import './styles.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import UnfoldMore from '@mui/icons-material/UnfoldMore';
import UnfoldLess from '@mui/icons-material/UnfoldLess';
import CustomerCard from '@/app/components/customerCard/CustomerCard';
import AddValueModal from '@/app/components/modal/AddValueModal';
import { useEffect, useState } from 'react';
import DeleteModal from '@/app/components/modal/DeleteModal';
import Loader from '@/app/components/modal/loader';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { getCustomers } from '@/app/redux/features/customer/customerThunk';
import { addCustomer, customerType, removeCustomer, sortCustomer, updateCustomer } from '@/app/redux/features/customer/customerSlice';


const Customers = () => {
    const { customers, isLoadingGet } = useAppSelector(state => state.customers);
    const dispatch = useAppDispatch();

    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDltModal, setOpenDltModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<customerType | null>(null);
    const [sortBy, setSortBy] = useState<"id" | "email" | "name">("id");
    useEffect(() => {
        dispatch(getCustomers());
    }, [])
    return (
        <div className='container'>
            {/* side bar */}
            <section className='sideBar'>
                {/* logo */}
                <img
                    src='logo.png'
                    className='logo'
                />
                <Button
                    variant="contained"
                    id='sideButton'
                    startIcon={<img src='customers_icon.png' />}
                >
                    Customers
                </Button>
            </section>
            {/* body */}
            <section className='content'>
                {/* header */}
                <div className='header'>
                    <h2>CUSTOMERS</h2>
                </div>
                {/* add button */}
                <div className='addCustomerBtnDiv'>
                    <Button
                        variant="contained"
                        className='Button'
                        startIcon={<AddIcon />}
                        onClick={() => setOpenAddModal(true)}
                    >
                        Add New Customers
                    </Button>
                </div>
                {/* customer list header */}
                <div className='listHeader'>
                    <div onClick={() => {
                        setSortBy("id");
                        dispatch(sortCustomer("id"));
                    }}>
                        <p >
                            Customer ID
                        </p>
                        {sortBy == "id" && <UnfoldMore />}
                    </div>
                    <div onClick={() => {
                        setSortBy("name");
                        dispatch(sortCustomer("name"));
                    }}>
                        <p >
                            Customer Name
                        </p>
                        {sortBy == "name" && <UnfoldMore />}
                    </div>
                    <div onClick={() => {
                        setSortBy("email");
                        dispatch(sortCustomer("email"));
                    }}>
                        <p >
                            Customer Email
                        </p>
                        {sortBy == "email" && <UnfoldMore />}
                    </div>
                </div>

                {/* card */}
                {
                    customers.map((item) => (
                        <CustomerCard
                            key={item?.email! + item.id! + item.first_name}
                            img={item.avatar!}
                            id={item.id!}
                            name={`${item.first_name} ${item.last_name}`}
                            email={item.email!}
                            onDlt={() => {
                                setOpenDltModal(true);
                                setSelectedCustomer(item);
                            }}
                            onEdit={() => {
                                setSelectedCustomer(item);
                                setOpenEditModal(true);
                            }}
                        />
                    ))
                }

            </section>
            {/* edit modal */}
            <AddValueModal
                showModal={openEditModal}
                onClose={() => {
                    setOpenEditModal(false);
                    setSelectedCustomer(null);
                }}
                btnText='EDIT CUSTOMER'
                headerText='Edit Customer'
                defaultValue={{
                    name: selectedCustomer?.first_name!,
                    email: selectedCustomer?.email!,
                    id: selectedCustomer?.id!,
                    image: selectedCustomer?.avatar!,
                }}
                onSubmit={(customer) => {
                    console.log(customer)
                    dispatch(updateCustomer({
                        first_name: customer.name,
                        last_name: '',
                        email: customer.email,
                        avatar: customer.image,
                        id: customer.id as number,
                    }));
                    setSelectedCustomer(null);
                    setOpenEditModal(false);
                }}
            />
            {/* add modal */}
            <AddValueModal
                showModal={openAddModal}
                onClose={() => setOpenAddModal(false)}
                btnText='ADD CUSTOMER'
                headerText='Add Customer'
                onSubmit={(customer) => {
                    customer.id = customers.length + 1;
                    dispatch(addCustomer({
                        first_name: customer.name,
                        last_name: '',
                        email: customer.email,
                        avatar: customer.image,
                        id: customer.id,
                    }))
                    setOpenAddModal(false);
                }}
            />
            {/* delete modal */}
            <DeleteModal
                showModal={openDltModal}
                onClose={() => {
                    setOpenDltModal(false);
                    setSelectedCustomer(null);
                }}
                onDlt={() => {
                    dispatch(removeCustomer(selectedCustomer!));
                    setSelectedCustomer(null);
                    setOpenDltModal(false);
                }}
            />
            {/* loader */}
            <Loader
                showLoader={isLoadingGet}
            />
        </div>
    );
}

export default Customers