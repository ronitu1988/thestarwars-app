import { createSlice } from '@reduxjs/toolkit';
import { fetchCharacters } from './characters.thunk';

const initialState = {
    nextPage: 'https://swapi.dev/api/people/?page=1',
    PrevPage: null,
    characters: [],

    // Loading States
    fetchCharactersLoading: false,
    fetchCharacterDetailsLoading: false
}


const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setCharacters: (state, action) => {
            state.characters = action.payload;
        },
        setNextPage: (state, action) => {
            state.nextPage = action.payload;
        },
        setPrevPage: (state, action) => {
            state.PrevPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.fetchCharactersLoading = true;
            })
            .addCase(fetchCharacters.fulfilled, (state) => {
                state.fetchCharactersLoading = false;
            })
    }
})

export const {
    setCharacters,
    setNextPage,
    setPrevPage
} = charactersSlice.actions;

export const selectCharacters = (state) => state.characters.characters;
export const selectFetchCharactersLoading = (state) => state.characters.fetchCharactersLoading;
export const selectFetchCharacterDetailsLoading = (state) => state.characters.fetchCharacterDetailsLoading;
export const selectFetchNextPage = (state) => state.characters.nextPage;
export const selectFetchPrevPage = (state) => state.characters.PrevPage;

export default charactersSlice.reducer;