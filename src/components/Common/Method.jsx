import { BaseURL, commonToken } from "../../config";
import Swal from 'sweetalert2';
import { GetSession } from "./CustomHooks";
import { useEffect, useState } from "react";


export const LoginAPI = (url, bodyData) => {
    let payloadData = {
        ...bodyData,
        authToken: commonToken
    }
    const abortController = new AbortController();
    let data = fetch(`${BaseURL + url}`, {
        method: "POST",
        body: JSON.stringify(payloadData),
        headers: {
            "Content-Type": "application/json"
        },
        signal: abortController.signal
    }).then((res) => res.json())
        .then((res) => {

            return res;
        })
        .catch((err) => {
            return err
        }).finally(() => {
            abortController.abort();
        });
    return data

};

export const DropDownData = (Type, ContextKey1 = '', ContextKey2 = '') => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    let Data = {
        authToken: commonToken,
        loginToken: GetSession('cookies', 'loginSessionID'),
        userCode: GetSession('cookies', 'EmpCode')
    };
    useEffect(() => {
        const abortController = new AbortController();
        fetch(`${BaseURL}/api/CommonData/GetMasterData`, {
            method: 'POST',
            body: JSON.stringify({ ...Data, Type, ContextKey1, ContextKey2 }),
            headers: {
                "Content-Type": "application/json"
            },
            signal: abortController.signal
        }).then((res) => res.json())
            .then((res) => {
                setData(res?.responseData?.data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err)
                setLoading(false)
            })
            .finally(() => {
                abortController.abort();
            });
    }, [Type, ContextKey1, ContextKey2])
    return { data, error, loading };
};

export const ApiCall = (url, bodyData) => {
    let payloadData = {
        ...bodyData,
        authToken: commonToken,
        loginToken: GetSession('cookies', 'loginSessionID'),
        userCode: GetSession('cookies', 'EmpCode'),
    }
    const abortController = new AbortController();
    let data = fetch(`${BaseURL + url}`, {
        method: "POST",
        body: JSON.stringify(payloadData),
        headers: {
            "Content-Type": "application/json"
        },
        signal: abortController.signal
    }).then((res) => res.json())
        .then((res) => {

            return res;
        })
        .catch((err) => {
            return err
        }).finally(() => {
            abortController.abort();
        });
    return data
};


export const setFocus = (ID) => {
    const element = document.getElementById(ID);
    if (element) {
        element.focus()
    }
}

export const NotificationSound = (status = '', message = '', focus = '', handleClear = null) => {
    const obj_status = {
        'ERROR': {
            position: "center",
            icon: 'error',
            title: 'Oops..',
            color: '#dc362e',
            sound: './Sound/Error.mp3',
        },
        'UNAUTHORIZED': {
            icon: 'error',
            title: 'UNAUTHORIZED',
            color: '#dc362e',
            sound: './Sound/Error.mp3',
        },
        'SUCCESS': {
            icon: 'success',
            title: 'Success',
            color: '#238914',
            sound: './Sound/Success.mp3',
        },
        'INFO': {
            icon: 'info',
            title: 'Information',
            color: '#2b6274',
            sound: './Sound/Success.mp3',
        }
    };
    const obj_position = {
        'top': 'top',
        'top start': 'top-start',
        'top end': 'top-end',
        'center': 'center',
        'center start': 'center-start',
        'center end': 'center-end',
        'bottom': 'bottom',
        'bottom start': 'bottom-start',
        'bottom end': 'bottom-end',
    };
    let enableNotificationSound = false;
    let _toast = false;
    let timer = 0;
    let position = obj_position?.center?.position;
    let width = 500;

    const { icon, title, color, sound } = obj_status[status.toUpperCase()] || obj_status.ERROR;

    if (_toast) {
        timer = 3000;
        width = 450;
    }
    const options = {
        position: 'center',
        toast: _toast,
        text: message || title,
        icon,
        title: (_toast ? null : title),
        color,
        confirmButtonColor: color,
        timerProgressBar: _toast,
        showConfirmButton: !_toast,
        iconColor: color,
        timer: timer,
        width: width,
        didOpen: (toast) => {
            if (_toast) {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
                //toast.addEventListener('click', () => Swal.close())

                if (status.trim().toUpperCase() === 'SUCCESS') {
                    if (handleClear !== null && focus !== '') {
                        handleClear()
                    }
                }
                if (focus !== '') {
                    setFocus(focus)
                }
            }
        },
        didClose: () => {
            if (!_toast) {
                if (status.trim().toUpperCase() === 'SUCCESS') {
                    if (handleClear !== null && focus !== null) {
                        handleClear()
                    }
                }
                if (focus !== '') {
                    setFocus(focus)
                }
            }
            if (status.trim().toUpperCase() === 'EXPIRED') {
                (async () => {
                    window.location.href = '/';
                })()
            }
        },
        showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster',
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster',
        },
    };

    Swal.fire(options).then((result) => {
        if (result.isConfirmed) {

            if (focus !== '') {
                setFocus(focus)
            }
        }
    });


    return;
}


export const ConfirmAlertBox = (status = '', message = '', callback, focusElementId = '',) => {
    if (message !== undefined && message !== "") {
        Swal.fire({
            text: message,
            icon: status.toLowerCase(),
            title: status.toUpperCase(),
            confirmButtonColor: '#238914',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel',
            showCancelButton: true,
            allowOutsideClick: false,
            width: 500,
            didClose: () => {
                if (focusElementId !== "")
                    document.getElementById(focusElementId)?.focus();
            }
        }).then((result) => {
            if (result.isConfirmed) {
                callback(result.isConfirmed);
            } else if (result.isDismissed) {
                callback(false);

            }
        });
        // alert(FindTranslatedKey(message))
    }
}

