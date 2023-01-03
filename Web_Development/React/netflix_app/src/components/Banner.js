import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import requests from '../api/requests';
import "./Banner.css";
import styled from 'styled-components';

export default function Banner() {

    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    // axios를 통해 영화 정보를 모두 가져올 때까지 기다려야 하므로, async-await 사용
    const fetchData = async () => {
        // 현재 상영중인 여러 영화 정보를 가져온다.
        const request = await axios.get(requests.fetchNowPlaying);
        // 여러 영화 중 랜덤한 영화 하나의 ID를 가져온다.
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id;

        // 특정 영화의 더 상세한 정보를 가져온다.(비디오 정보 포함)
        // {data: movieDetail} 부분은 객체에 구조분해할당이 적용된 것
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response: "videos" }
        })

        setMovie(movieDetail);
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };


    // 클릭 되지 않았을 때는 기본 배너를, 클릭되었을 때는 이미지 배너를 보여준다.
    if (!isClicked) {
        return (
            <header
                className="banner"
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover",
                }}
            >
                <div className="banner__contents">
                    <h1 className="banner__title">
                        {/*Optional Chaining과 단락 평가 고려*/}
                        {movie?.title || movie?.name || movie}
                    </h1>
                    <div className="banner__buttons">
                        <button className="banner__button play" onClick={() => setIsClicked(true)}>Play</button>
                        <button className="banner__button info">
                            <div className="space"></div>
                            More Information
                        </button>
                    </div>
                    <h1 className="banner__description">
                        {truncate(movie?.overview, 100)}
                    </h1>
                </div>
                <div className="banner--fadeBottom" />
            </header>
        );
    } else {
        return (
            <Container>
                <HomeContainer>
                    {/*유튜브 제목을 안 보이게 만든다.*/}
                    <div style={{ position: "absolute", backgroundColor: "black", width: "100%", height: "70px", zIndex: 1 }}></div>
                    <Iframe
                        width="640"
                        height="360"
                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?wmode=opaque&rel=0&controls=0&showinfo=0&modestbranding=0&disablekb=1&autoplay=1&loop=1&mute=0&playlist=${movie.videos.results[0].key}`}
                        title="YouTube video player"
                        frameborder="0"
                        allow="autoplay; fullscreen"
                    >
                    </Iframe>
                    <div style={{ position: "absolute", backgroundColor: "black", width: "100%", height: "70px", bottom: 0, zIndex: 1 }}></div>
                </HomeContainer>
            </Container>
        )
    }
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`

const HomeContainer = styled.div`
    display: relative;
    width: 100%;
    height: 100%;
`

// '&' : 중첩된 바로 위의 부모 선택자인 iframe을 참조한다. / '::' : 가상 선택자
const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: none;
    border: none;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`

