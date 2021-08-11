import React from 'react'

const Modal = (props) => {
    const { open, onClose, children } = props
    // document.body.style.position = 'relative'
    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${open ? 'block' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className={"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"}>
                <div className={"fixed inset-0 bg-black bg-opacity-10 transition-opacity"} aria-hidden="true"></div>
                <span className={"hidden sm:inline-block sm:align-middle sm:h-screen"} aria-hidden="true">&#8203;</span>
                <div className={"inline-block text-white rounded-md shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"}>
                    <p className={'absolute text-2xl cursor-pointer bg-black border rounded-full m-0 px-2 hover:text-gray-500 font-bold -top-4 -right-4'} onClick={onClose}>X</p>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal