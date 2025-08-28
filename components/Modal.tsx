import { useEffect, useState } from "react";
import React from "react";
import ReactDOM from 'react-dom';

interface ModalProps {
    children: React.ReactNode
    handleCloseModal(): void
}

const Modal: React.FC<ModalProps> = ({ children, handleCloseModal }) => {
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const el = document.getElementById("portal");
        setPortalRoot(el);
    }, []);

    if (!portalRoot) return null

    return ReactDOM.createPortal(
        <div className="modal-container">
            <button onClick={handleCloseModal} className="modal-underlay" />
            <div className="modal-content">
                <button className="flex items-center close-button" onClick={handleCloseModal}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                {children}
            </div>
        </div>,
        portalRoot
    );
}

export default Modal