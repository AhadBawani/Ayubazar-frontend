import React, { useState } from 'react'
import Input from '../../Fields/Input'
import Button from '../../Fields/Button'
import useUserState from '../../Hooks/useUserState'
import { toast } from 'react-toastify'
import { editUserRequestHandler } from '../../RequestHandlers/RequestHandler/UserRequestHandler'
import { useDispatch } from 'react-redux'

const AccountDetails = () => {
    const { user } = useUserState();
    const dispatch = useDispatch();
    const [userState, setUserState] = useState({
        firstName: user?.firstName || null,
        lastName: user?.lastName || null,
        displayName: user?.displayName || null,
        password: null,
        confirmPassword: null
    })
    const [error, setError] = useState({
        firstName: false,
        lastName: false,
        displayName: false,
        password: false,
        confirmPassword: false
    })
    const handleSaveChanges = () => {
        let valid = true;
        const newErrors = { ...error };

        if (!userState.firstName) {
            newErrors.firstName = true;
            valid = false;
        } else {
            newErrors.firstName = false;
        }

        if (!userState.lastName) {
            newErrors.lastName = true;
            valid = false;
        } else {
            newErrors.lastName = false;
        }

        if (!userState.displayName) {
            newErrors.displayName = true;
            valid = false;
        } else {
            newErrors.displayName = false;
        }

        if (!userState.password) {
            newErrors.password = true;
            valid = false;
        } else {
            newErrors.password = false;
        }

        if (!userState.confirmPassword) {
            newErrors.confirmPassword = true;
            valid = false;
        } else {
            newErrors.confirmPassword = false;
        }

        if (valid) {
            if (userState.password === userState.confirmPassword) {
                editUserRequestHandler(dispatch, userState, user?._id)
                    .then((updateUser) => {
                        if (updateUser) {
                            toast.success('User updated successfully!');
                        }
                    });
            }
            else {
                toast.error("Password not match!");
            }
        }
        else {
            setError(newErrors);
            toast.error('Fill required fields!')
        }

    }
    const onInput = (e) => {
        setUserState({ ...userState, [e.target.name]: e.target.value });
    }
    return (
        <div className='p-4'>
            <div className='sm:pr-4'>
                <div className='flex flex-col mb-4'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        First Name *
                    </span>
                    <Input defaultValue={userState.firstName}
                        onChange={onInput} name="firstName" error={error.firstName} />
                </div>
                <div className='flex flex-col mb-4'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        Last Name *
                    </span>
                    <Input defaultValue={userState.lastName}
                        onChange={onInput} name="lastName" error={error.lastName} />
                </div>
                <div className='flex flex-col mb-4'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        Display Name *
                    </span>
                    <Input defaultValue={userState.displayName}
                        onChange={onInput} name="displayName" error={error.displayName} />
                </div>
                <div className='flex flex-col mb-4'>
                    <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                        Email Address *
                    </span>
                    <Input value={user?.email} />
                </div>
            </div>
            <div className='sm:pr-4'>
                <div className='p-2' style={{ border: '1px solid silver' }}>
                    <div>
                        <div className='flex flex-col mb-2'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                Current Password
                            </span>
                            <Input type="password" disabled={true}
                                bgColor="#abb8c3" value={user?.password} />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                New Password
                            </span>
                            <Input type="password" onChange={onInput} name="password"
                                error={error.password} />
                        </div>
                        <div className='flex flex-col mb-2'>
                            <span className='text-[#4D4D4D] text-sm font-semibold mb-1'>
                                Confirm Password
                            </span>
                            <Input type="password" name="confirmPassword" onChange={onInput}
                                error={error.confirmPassword} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-6'>
                <Button text="Save Changes" onClick={handleSaveChanges} />
            </div>
        </div>
    )
}

export default AccountDetails