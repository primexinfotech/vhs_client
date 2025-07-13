import { Cookies } from 'react-cookie';

const cookies = new Cookies();

//-------------------To Store data in Local, Cookies and Session Storage-----------------------//
export const SetSession = (type, key, value) => {
    if (type.toLowerCase() === ('localStorage').toLowerCase()) {
        window.localStorage.setItem(key, value);
    } else if (type.toLowerCase() === ('cookies').toLowerCase()) {
        cookies.set(key, value);
    } else if (type.toLowerCase() === ('sessionStorage').toLowerCase()) {
        sessionStorage.setItem(key, value);
    }
}

//-------------------To Getting Store data in Local, Cookies and Session Storage-----------------------//
export const GetSession = (type, key) => {
    if (type.toLowerCase() === ('localStorage').toLowerCase()) {
        let data = window.localStorage.getItem(key);
        return data
    } else if (type.toLowerCase() === ('cookies').toLowerCase()) {
        let data = cookies.get(key);
        return data
    } else if (type.toLowerCase() === ('sessionStorage').toLowerCase()) {
        let data = sessionStorage.getItem(key);
        return data
    }
}

//-------------------To Remove data from Local, Cookies and Session Storage-----------------------//
export const RemoveSession = (type, key) => {
    if (type.toLowerCase() === ('localStorage').toLowerCase()) {
        localStorage.removeItem(key);
    } else if (type.toLowerCase() === ('cookies').toLowerCase()) {
        cookies.remove(key)
    } else if (type.toLowerCase() === ('sessionStorage').toLowerCase()) {
        sessionStorage.removeItem(key);
    }
}

