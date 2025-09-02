import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function Thumbnail() {

    const [article, setArticle] = useState([]);

    const fetchApi = async () => {
        const res = await axios.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7c3256b03a4a4708babe00fbab47955b');
        setArticle(res.data.articles)

    }
    useEffect(() => {
        fetchApi()
    }, [])
    return (
        <div className='album py-5 bg-light text-center'>
            <section className='container'>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                    {
                        article.map((news, index) => (
                            <div className='col p-2 bg-white border' key={index}>
                                <img src={news.urlToImage ?? "https://www.shutterstock.com/image-photo/tv-live-news-program-professional-600nw-2160015507.jpg"} alt="" className='img-thumbnail' style={{ height: 250 }} />
                                <h3>{news.source.name}</h3>
                                <h5>{news.title}</h5>
                                <p>{news.description ?? "You can find news images from major global photo agencies, renowned publications, and photojournalism showcase websites. For current, real-time images, the best sources are the newsrooms"}</p>
                                <div className="d-flex justify-content-between">
                                    <div className='pagination'>
                                        <a href={news.url} className='page-link btn border-secondary text-secondary'>View</a>
                                        <a href={news.url} className='page-link btn border-secondary text-secondary'>Edit</a>
                                    </div>
                                    <p className='text-secondary'>9 mins</p>
                                </div>
                            </div>))
                    }
                </div>
            </section>
        </div>
    )
}
