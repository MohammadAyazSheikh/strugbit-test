import { customerType } from "../redux/features/customer/customerSlice";


export function sortByID(arr: customerType[]) {
    return arr.slice().sort((a, b) => a.id - b.id);
}


export function sortByFirstName(arr: customerType[]) {
    return arr.slice().sort((a, b) => a.first_name.localeCompare(b.first_name));
}


export function sortByEmail(arr: customerType[]) {
    return arr.slice().sort((a, b) => a.email.localeCompare(b.email));
}