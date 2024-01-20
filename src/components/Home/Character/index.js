
import React, { useState } from 'react';
import './style.css';


const Character = ({ data, onSetCharacterDetails, convertCmtoMeter, convertDate }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleHoverExit = () => {
        setIsHovered(false);
    };

    /* set data to Modal when user click specific character */
    const openModal = () => {
        onSetCharacterDetails(data);
    };


    return (
        <div
            key={data.name}
            className="character-card"
            onClick={openModal}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverExit}
            style={{ backgroundColor: `${data.color}` }}
        >

            {
                isHovered ?
                    <div className="animate-text">
                        < div className="charName" > {data.name}</div >
                        <div className="vl"></div>
                        <div style={{ textAlign: 'left', marginLeft: '10px', fontSize: '18px', width: '250px' }}>
                            <div>
                                <p>Height: {convertCmtoMeter(data.height)} meters</p>
                                <p>DOB: {data.birth_year}</p>
                            </div>
                            <div>
                                <p>Mass: {data.mass} kg</p>
                                <p>Number of Films: {data.films.length}</p>

                            </div>
                            <p>Added to API: {convertDate(data.created)}</p>
                        </div>
                    </div>
                    :
                    <p>{data.name}</p>
            }
        </div >
    )
}

export default Character;