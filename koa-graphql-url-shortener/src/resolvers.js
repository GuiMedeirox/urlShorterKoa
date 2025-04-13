import { nanoid } from "nanoid";
import { db } from "./db.js";

export const resolvers = {

    Query: {
        getURL: (_, {code}) => {
            const row = db.prepare(`SELECT * FROM urls WHERE code = ?`).get(code); 
            return row || null
        }
    },

    Mutation:{
        shortenURL: (_, {url}) => {
            const code = nanoid(6); 
            db.prepare(`INSERT INTO urls (code, url) VALUES (?, ?)`).run(code, url);
            return {code, url}
        }, 

        updateURL: (_, {code, newURL}) => {
            const result = db.prepare(`UPDATE urls SET url = ? WHERE code = ?`).run(newURL, code); 
            if (result.changes === 0) return null; 
            return {code, url:newURL}; 
        }, 

        deleteURL: (_, {code})=> {
            const result = db.prepare(`DELETE FROM urls WHERE code = ?`).run(code); 
            return result.changes > 0;
        }


    }

}
