import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { setCharacters, setNextPage, setPrevPage } from './characters.slice';

const speciesColor = {
    "Human": "#b53911",
    "Droid": "#6bc19b",
    "Wookie": "#fd5a16",
    "Rodian": "#c2c768",
    "Hutt": "#b9b022",
    "Yoda's Species": "#cdab9a",
    "Trandoshan": "#c2fff9",
    "Mon Calamari": "#396059",
    "Ewok": "#992d9b",
    "Sullustan": "#edba33",
    "Neimodian": "#06ad18",
    "Gungan": "#fcb04a",
    "Toydarian": "#1b84ab",
    "Dug": "#432a0a",
    "Twi'lek": "#d7729a",
    "Aleena": "#3a37a5",
    "Vulptereen": "#805322",
    "Xexto": "#b1e8d8",
    "Toong": "#9fd220",
    "Cerean": "#bd0527",
    "Nautolan": "#623682",
    "Zabrak": "#ab036e",
    "Tholothian": "#445301",
    "Iktotchi": "#b74e5c",
    "Quermian": "#f6f33d",
    "Kel Dor": "#8cb699",
    "Chagrian": "#ae2480",
    "Geonosian": "#b2fb37",
    "Mirialan": "#2bf4d9",
    "Clawdite": "#055e74",
    "Besalisk": "#cc578d",
    "Kaminoan": "#dfa574",
    "Skakoan": "#22b5b5",
    "Muun": "#55b3a8",
    "Togruta": "#3be00f",
    "Kaleesh": "#6138cb",
    "Pau'an": "#77422a",
}

const cachingSpecies = {}

const cachingHomeworld = {}

const regex = /\/(\d+)\/$/;

const findLastDigitInURL = (url) => {
    const match = url.match(regex);
    if (match) {
        return match[1];
    }
    return 0
}

export const fetchCharacters = createAsyncThunk(
    'characters/fetchCharacters',
    async (page, thunkAPI) => {
        if (page) {
            try {
                /* Call api to get people/characters details */
                const response = await axios.get(page);

                const charactersArr = response.data.results;
                for (const data of charactersArr) {

                    try {
                        /* Call api to get species details 
                            Using hash table to store information already being called
                            to reduce number of API - Looking like API doesnt have implement
                            Caching so the response time get is too long
                        */

                        if (!!data.species.length) {  /* Call api to get species details */
                            const url = data.species[0]
                            const lastDigit = findLastDigitInURL(url);
                            if (lastDigit in cachingSpecies) {
                                data.color = cachingSpecies[lastDigit]
                            }
                            else {
                                const resDetails = await axios.get(url);
                                data.color = speciesColor[resDetails.data.name];
                                cachingSpecies[lastDigit] = data.color
                            }

                        }
                    } catch (err) {
                        console.log('ERR - Species: ', err)
                    }

                    try {
                        if (data.homeworld) {      /* Call api to get homeworl details */
                            const url = data.homeworld
                            const lastDigit = findLastDigitInURL(url);
                            if (lastDigit in cachingHomeworld) {
                                data.color = cachingHomeworld[lastDigit]
                            }
                            else {
                                const resHomeworldDetails = await axios.get(url);
                                data.homeworldDetails = resHomeworldDetails.data;
                                cachingHomeworld[lastDigit] = data.homeworldDetails
                            }
                        }
                    } catch (err) {
                        console.log('ERR - homeworld: ', err)
                    }
                }
                thunkAPI.dispatch(setNextPage(response.data.next))
                thunkAPI.dispatch(setPrevPage(response.data.previous))
                thunkAPI.dispatch(setCharacters(charactersArr))
            } catch (err) {
                console.log('ERR: ', page, err)
            }
        }

    }
)