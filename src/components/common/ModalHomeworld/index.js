import React from 'react';
import Modal from 'react-modal';


const ModalHomeworld = ({
    currentCharacterDetails,
    isOpen,
    handleCloseModal,
    convertCmtoMeter,
    convertDate
}) => {

    const customStyles = {
        content: {
            width: '40%', // Set your custom width here
            height: '48%', // Set your custom height here
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: currentCharacterDetails?.color || 'white',
        },
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={handleCloseModal} style={customStyles}>
            {currentCharacterDetails && (
                <div className="modal-details">
                    <button onClick={handleCloseModal} className="close-button">
                        <span>&times;</span> {/* '×' symbol for close */}
                    </button>
                    <h2>{currentCharacterDetails.name}</h2>
                    <hr></hr>
                    <div style={{ textAlign: 'left', marginLeft: '25px' }}>         {/* Display people/character at top section of modal*/}
                        <p>Height: {convertCmtoMeter(currentCharacterDetails.height)} meters</p>
                        <p>Mass: {currentCharacterDetails.mass} kg</p>
                        <p>Added to API: {convertDate(currentCharacterDetails.created)}</p>
                        <p>Number of Films: {currentCharacterDetails.films.length}</p>
                        <p>DOB: {currentCharacterDetails.birth_year}</p>
                    </div>
                    {currentCharacterDetails.homeworldDetails && (                  /* Display homeworld at bottom of modal*/
                        <div>
                            <hr></hr>
                            <h3>Homeworld</h3>
                            <div style={{ textAlign: 'left', marginLeft: '25px' }}>
                                <p>Name: {currentCharacterDetails.homeworldDetails.name}</p>
                                <p>Terrain: {currentCharacterDetails.homeworldDetails.terrain}</p>
                                <p>Climate: {currentCharacterDetails.homeworldDetails.climate}</p>
                                <p>Residents: {currentCharacterDetails.homeworldDetails.residents.length}</p>

                            </div>
                        </div>
                    )}
                </div>)
            }
        </Modal >
    )
}

export default ModalHomeworld;