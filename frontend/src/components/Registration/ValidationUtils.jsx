/** 
 * File: ValidationUtils.js
 * Author: IT20125202
 * Description: This file contains functions for validating agent and staff registration form data.
 * Parameters: formData - an object containing the form data to be validated
 */

// Function to validate agent registration form data
export const validateAgentForm = (formData) => {
    const errors = {};

    if (!formData.regNo) {
        errors.regNo = 'A valid registration number is required';
    }

    if (!formData.nic) {
        errors.nic = 'NIC is required';
    } else if (!/^\d{9}[Vv]$/.test(formData.nic) && !/^\d{12}$/.test(formData.nic)) {
        errors.nic = 'Invalid NIC format. Valid formats are 123456789V, 123456789v, and 123456789101';
    }    

    if (!formData.name) {
        errors.name = 'Name is required';
    }

    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = 'Invalid email format. Valid format is john123@example.com';
    }

    if (!formData.mobile) {
        errors.mobile = 'Mobile number is required';
    } else if (!/^(?:\d{10}|\+\d{11})$/.test(formData.mobile)) {
        errors.mobile = 'Invalid mobile number format. Valid formats are 0712345678 and +94712345678';
    }

    if (!formData.username) {
        errors.username = 'Username is required';
    }

    if (!formData.password) {
        errors.password = 'Password is required';
    } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)
    ) {
        errors.password = 'Password should be at least 8 characters and include lowercase, uppercase, a number, and a special character';
    }

    return errors;
};

// Function to validate staff registration form data
export const validateStaffForm = (formData) => {
    const errors = {};

    if (!formData.empId) {
        errors.empId = 'A valid employee ID is required';
    }

    if (!formData.nic) {
        errors.nic = 'NIC is required';
    } else if (!/^\d{9}[Vv]$/.test(formData.nic) && !/^\d{12}$/.test(formData.nic)) {
        errors.nic = 'Invalid NIC format. Valid formats are 123456789V, 123456789v, and 123456789101';
    }    

    if (!formData.name) {
        errors.name = 'Name is required';
    }

    if (!formData.email) {
        errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = 'Invalid email format';
    }

    if (!formData.mobile) {
        errors.mobile = 'Mobile number is required';
    } else if (!/^(?:\d{10}|\+\d{11})$/.test(formData.mobile)) {
        errors.mobile = 'Invalid mobile number format. Valid formats are 0712345678 and +94712345678';
    }

    if (!formData.username) {
        errors.username = 'Username is required';
    }

    if (!formData.password) {
        errors.password = 'Password is required';
    } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)
    ) {
        errors.password = 'Password should be at least 8 characters and include lowercase, uppercase, a number, and a special character';
    }

    return errors;
};