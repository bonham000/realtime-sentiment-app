
import axios from 'axios'

import { GET_NEWS } from '../constants/news'
import { API_KEY } from '../constants/api'

const saveNews = (news) => {
	return {
		type: GET_NEWS,
		news
	}
};

export const getNews = () => {
	return dispatch => {
		axios.get(`https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=${API_KEY}`).then( (response) => {
			console.log('Received news data');
			dispatch(saveNews(response.data));
		}).catch(err => console.log(err));
	}
}

