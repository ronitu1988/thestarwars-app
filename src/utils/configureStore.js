import { configureStore } from "@reduxjs/toolkit";

import charactersReducer from '../redux/characters.slice';

export default configureStore({
    reducer: {
        characters: charactersReducer
    }
});