import axios from 'axios'

export const get = async (baseName, o, k) => {
        try{
            let getData = await axios.get("http://sobatdev.com:1945/domain", {
                params: {
                    q: baseName.trim(),
                    k: k.toLowerCase(),
                    o: o.toLowerCase()
                }
            })

            return getData
        } catch(e)
        {
            return e
        }
        
}