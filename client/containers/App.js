
import React from 'react'
import { connect } from 'react-redux'

const socket = io.connect('http://localhost:5001');

@connect( 
	state => ({
		news: state.news
	}),
	null
)
export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			likedArticles: new Map()
		}
		this.likeArticle = this.likeArticle.bind(this);
		this.unlikeArticle = this.unlikeArticle.bind(this);

		socket.on('initialize-likes', (currentLikes) => {
			const setLikes = new Map();
			for (let articleID in currentLikes) {
				setLikes.set(articleID, currentLikes[articleID])
			}
			this.setState({
				likedArticles: setLikes
			});
		});

		socket.on('add-like', (identifier) => {
			const { likedArticles } = this.state;
			
			likedArticles.get(identifier)
			? likedArticles.set(identifier, likedArticles.get(identifier) + 1)
			: likedArticles.set(identifier, 1);

			this.setState({
				likedArticles
			});

		});

		socket.on('add-unlike', (identifier) => {
			const { likedArticles } = this.state;
			
			if (likedArticles.get(identifier) > 0) {
				likedArticles.set(identifier, likedArticles.get(identifier) - 1);
			}

			this.setState({
				likedArticles
			});

		});

	}
	likeArticle(identifier) { socket.emit('like', identifier) }
	unlikeArticle(identifier) { socket.emit('unlike', identifier) }
	render() {
		const { likedArticles } = this.state;
		const renderNews = this.props.news.articles.map( (article, idx) => {
			return (
				<div key = {idx} className = 'article'>

					<div className = 'like'>
						<i onClick = {this.unlikeArticle.bind(this, article.publishedAt)} className = "fa fa-thumbs-down" aria-hidden = "true"></i>
					</div>
					<div className = 'content'>
						<h1>{article.title}</h1>
						<h2>By: {article.author}</h2>
						<p>{article.description}</p>
						<h3>Current Likes = {likedArticles.get(article.publishedAt) ? likedArticles.get(article.publishedAt) : 0}</h3>
					</div>
					<div className = 'like'>
						<i onClick = {this.likeArticle.bind(this, article.publishedAt)} className = "fa fa-thumbs-up" aria-hidden = "true"></i>
					</div>

				</div>
			);
		});
		return (
			<div>
				{renderNews}
			</div>
		);
	}
};