import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
});

export const fetchAPOD = (date) =>
  api.get('/apod', { params: { date } });

export const fetchNeoWs = (startDate, endDate) =>
  api.get('/neows', { params: { start_date: startDate, end_date: endDate } });

export const fetchMarsPhotos = (rover, sol, camera) =>{
    const params = {rover, sol}
    if (camera) params.camera = camera
    return api.get('/mars', { params });
}
