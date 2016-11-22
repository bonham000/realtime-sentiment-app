
import { GET_NEWS } from '../constants/news'

const news = (state = {}, action) => {
	switch(action.type) {
		case GET_NEWS:
			return Object.assign({}, action.news);
		default:
			return state;
	}
}

export default news;