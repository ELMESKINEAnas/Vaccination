import axios from "axios";

export const getRegions = async () => {

        try {
            let res = await axios.get('https://calm-fjord-14795.herokuapp.com/api/regions');
            return res;
        }catch (e) {
            console.error(e);
        }

    };