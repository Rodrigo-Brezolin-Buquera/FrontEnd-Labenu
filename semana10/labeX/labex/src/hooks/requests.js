import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from '../constants/baseURL';

export function useTripsLists() {
    const [trips, setTrips] = useState([])
    const URL = `${baseURL}/trips`

    useEffect(() => {
        axios.get(URL)
            .then((res) => {
                setTrips(res.data.trips)
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }, [trips])

    return trips
}

export const applyToTrip = (form) => {
    const URL = `${baseURL}/trips/${form.id}/apply`
    const body = {
        "name": form.name,
        "age": form.age,
        "applicationText": form.applicationText,
        "profession": form.profession,
        "country": form.country,
    }

    axios.post(URL, body)
        .then(() => {
            alert("Inscrição feita com sucesso")
        })
        .catch((err) => {
            alert(err.response.data.message)
        })
}

export const createTrip = (form) => {
    const URL = `${baseURL}/trips/`
    const headers = {
        headers: { auth: localStorage.getItem("token") }
    }

    axios.post(URL, form, headers)
        .then(() => {
            alert("Viagem criada com sucesso")
        })
        .catch((err) => {
            alert(err.response.data.message)
        })
}

export const deleteTrip = (id) => {
    const URL = `${baseURL}/trips/${id}`
    const headers = {
        headers: { auth: localStorage.getItem("token") }
    }

    axios.delete(URL, headers)
        .then(() => {
            alert("Viagem deletada")
        })
        .catch((err) => {
            alert(err.response.data.message)
        })
}
