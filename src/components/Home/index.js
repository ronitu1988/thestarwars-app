import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ArrowLeftIcon from '../common/ArrowLeftIcon';
import ArrowRightIcon from '../common/ArrowRightIcon';
import ModalHomeworld from '../common/ModalHomeworld';
import Character from './Character';


import {
    selectCharacters,
    selectFetchCharacterDetailsLoading,
    selectFetchCharactersLoading,
    selectFetchNextPage,
    selectFetchPrevPage
} from '../../redux/characters.slice';
import { fetchCharacters } from '../../redux/characters.thunk';


const INITIAL_PAGE = 1;

const Home = () => {

    const dispatch = useDispatch();

    const characters = useSelector(selectCharacters);
    const selectNextPage = useSelector(selectFetchNextPage);
    const selectPrevPage = useSelector(selectFetchPrevPage);
    const isFetchCharactersLoading = useSelector(selectFetchCharactersLoading)
    const isfetchCharacterDetailsLoading = useSelector(selectFetchCharacterDetailsLoading)

    const [nextPage, setNextPage] = useState('https://swapi.dev/api/people/?page=1');
    const [PreviousPage, setPrevPage] = useState(null);
    const [currentCharacterDetails, setCurrentCharacterDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (nextPage) {
            setNextPage(false)
            dispatch(fetchCharacters(selectNextPage));
        }
        if (PreviousPage) {
            setPrevPage(false)
            dispatch(fetchCharacters(selectPrevPage));
        }

    }, [nextPage, PreviousPage])

    const handleSetNextPage = (page) => {
        setNextPage(true)
        dispatch(fetchCharacters(page));
    }

    const handleSetPrevPage = (page) => {
        setPrevPage(true)
        dispatch(fetchCharacters(page));
    }

    /* Handle Close Modal and set value to null*/
    const handleCloseModal = () => {
        setCurrentCharacterDetails(null)
        setIsModalOpen(false)
    }

    /* Handle when user select person/character and open the modal */
    const handleSelectCharacter = (characterData) => {
        setCurrentCharacterDetails(characterData)
        setIsModalOpen(true)
    }


    /* Helper function to convert cm to meter */
    const convertCmtoMeter = (dataString) => {
        const parsedCm = parseFloat(dataString);
        const meter = parsedCm / 100;
        return meter.toFixed(2); // Display 2 decimal places
    }

    /* Helper function to format date */
    const convertDate = (dateString) => {
        const date = new Date(dateString);
        // Format the date to MM-dd-yyyy using toLocaleDateString()
        const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });

        return formattedDate
    }

    return (
        <>
            {(isFetchCharactersLoading || isfetchCharacterDetailsLoading) && <h1>Loading ... ...</h1>}
            {!(isFetchCharactersLoading || isfetchCharacterDetailsLoading) && (
                <div className="page-wrapper">
                    <div className="pagination-left" key='pagination-left'>
                        <ArrowLeftIcon
                            onClick={() => handleSetPrevPage(selectPrevPage)}
                            isDisabled={selectPrevPage === null ? 'disable-arrow-icon arrow-icon' : "arrow-icon"}>
                        </ArrowLeftIcon>
                    </div>
                    <div className="container">
                        {
                            characters.map((character) => (
                                <Character
                                    data={character}
                                    onSetCharacterDetails={handleSelectCharacter}
                                    convertCmtoMeter={convertCmtoMeter}
                                    convertDate={convertDate}
                                />
                            ))
                        }
                    </div>
                    <div className="pagination-right" key='pagination-right'>
                        <ArrowRightIcon
                            onClick={() => handleSetNextPage(selectNextPage)}
                            isDisabled={selectNextPage === null ? 'disable-arrow-icon arrow-icon' : "arrow-icon"}>
                        </ArrowRightIcon>
                    </div>
                </div>
            )}
            {/* MODAL */}
            <ModalHomeworld
                currentCharacterDetails={currentCharacterDetails}
                isOpen={isModalOpen}
                handleCloseModal={handleCloseModal}
                convertCmtoMeter={convertCmtoMeter}
                convertDate={convertDate}
            />
        </>
    )
}

export default Home