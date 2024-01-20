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
                        /* Call api to get species details */
                        /*
                            Todo: Can reduce api call since we can parse the URL
                            https://swapi.dev/api/species/2/
                            The last digit url can determine species base on predefine color
                        */
                        if (!!data.species.length) {  /* Call api to get species details */
                            const resDetails = await axios.get(data.species[0]);
                            data.color = speciesColor[resDetails.data.name];
                        }
                    } catch (err) {
                        console.log('ERR - Species: ', err)
                    }

                    try {
                        if (data.homeworld) {      /* Call api to get homeworl details */
                            const resHomeworldDetails = await axios.get(data.homeworld);
                            data.homeworldDetails = resHomeworldDetails.data;
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