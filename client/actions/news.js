
import axios from 'axios'

import { GET_NEWS } from '../constants/news'


const saveNews = (news) => {
	return {
		type: GET_NEWS,
		news
	}
};

export const getNews = () => {
	return dispatch => {
		axios.get('https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=9cc02628ee6e412f9b06f666266e9e08').then( (response) => {
			console.log(response);
			dispatch(saveNews(response.data));
		}).catch(err => console.log(err));
	}
}

