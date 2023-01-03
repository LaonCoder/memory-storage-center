import React from 'react';
import Banner from '../../components/Banner';
import Row from '../../components/Row';
import requests from '../../api/requests';

const MainPage = () => {
  return (
    <div>
      <Banner />

        <Row 
            title="NETFLIX ORIGINALS"
            id="NO"
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow
        />
        <Row title="TREADING NOW" id="TN" fetchUrl={requests.fetchTrending} />
        <Row title="TOP RATED" id="TR" fetchUrl={requests.fetchTopRated} />
        <Row title="ACTION MOVIES" id="AM" fetchUrl={requests.fetchActionMovies} />
        <Row title="COMEDY MOVIES" id="CM" fetchUrl={requests.fetchComedyMovies} />
    </div>
  );
}

export default MainPage;