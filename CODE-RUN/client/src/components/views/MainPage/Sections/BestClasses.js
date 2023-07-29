import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './BestClasses.css';

function BestClasses(props) {
    const tmp_url =
        'https://images.unsplash.com/photo-1595617795501-9661aafda72a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
    const [bests, setBests] = useState(props.BestVideos);
    const gotoVideoPage = function (item) {
        // 여기 변경
        props.history.push(`/watch/${item.id}`);
    };

    useEffect(() => {
        setBests(props.BestVideos);
    }, [props.BestVideos]);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        lazyLoad: true,
    };
    return (
        <div className="bestClasses">
            <h2 className="bestClassesTitle"> Best Classes </h2>
            <Slider {...settings}>
                {bests.length > 0 &&
                    bests.map((item, idx) => (
                        <div className="bestClassCard" onClick={() => gotoVideoPage(item)}>
                            <img
                                src={item.thumbnail}
                                className="BestClassImage"
                                alt="thumbnail is gone...."
                            />
                            <h3 className="bestClassTitle">{item.title}</h3>
                            <h4 className="bestClassNickname">{item.name}</h4>
                        </div>
                    ))}
            </Slider>
        </div>
    );
}

export default BestClasses;
