import React from 'react';

// @ts-ignore
const NameEditor = ({ children,isOpen, close }) => {

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={close}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
                <button onClick={close} style={{
                    marginLeft: 10
                }}>Close
                </button>
            </div>
        </div>
    );
};

export default NameEditor;