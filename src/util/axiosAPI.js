import axios from "axios";
import {ElMessage} from "element-plus/es";


export function postRes(url, data, success) {
    return axios.post(
        url,
        data,
        {
            headers:{
                "token": localStorage.getItem('Authorization')
            }
        }
    ).then(
        resp => success(resp)
    ).catch( err =>{
        console.log(err);
    })

}

export function postResNew(url, data) {
    return axios.post(
        url,
        data, {
            headers: {
                "token": localStorage.getItem('Authorization')
            }
        }
    ).catch(err => {
        console.log(err);
    })

}

export function getRes(url, success){
    axios.get(url, {
        headers:{
            "token": localStorage.getItem('Authorization')
        }
    }).then(
        resp => success(resp)
    ).catch(
        // err => console.log(err)
    )
}



export function getResNew(url) {
    return axios.get(url, {
        headers: {
            "token": localStorage.getItem('Authorization')
        }
    }).then(
        res => res.data
    ).catch(
        err => console.log(err)
    )
}
