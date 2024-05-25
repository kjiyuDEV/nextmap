'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import PlaceDetailModal from './modals/PlaceDetailModal';

const Modal = () => {
    const dispatch = useDispatch();
    const { modal } = useSelector((state: any) => {
        console.log(state);
        return {
            modal: state.modals.modal,
        };
    });
    const handleClose = () => {
        dispatch({ type: 'CLOSE_POPUP_MODAL' });
    };

    return modal.open ? (
        <div className="modal-wrap">
            <div className="modal">
                <div className="close-btn-wrap">
                    <button className="close-btn">
                        <FontAwesomeIcon icon={faXmark} fontSize="30px" color="black" onClick={handleClose} />
                    </button>
                </div>
                <p className="title">{modal.title}</p>
                <PlaceDetailModal />
            </div>
        </div>
    ) : (
        <></>
    );
};

export default Modal;
