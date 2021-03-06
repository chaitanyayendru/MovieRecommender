import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

import { fetchDataStart } from '../../redux/movies/moviesActions';
import { selectNowPlayingCollections } from '../../redux/movies/movieSelectors';
import { useWindowSize } from '../../redux/movies/movieUtil';
import NowPlayingItem from './nowPlayingItemComponent';

const NowPlaying = ({ collections, fetchDataStart }) => {
  const [width] = useWindowSize();

  useEffect(() => {
    fetchDataStart(`/movie/now_playing`);
  }, [fetchDataStart]);

  return (
    <div className="now-playing-container">
      <Container>
        <Carousel interval={width < 600 ? null : null}>
          {collections
            ? collections.map((collectionItem, i) => (
                <Carousel.Item key={i}>
                  <NowPlayingItem
                    collectionItem={collectionItem}
                    width={width}
                  />
                </Carousel.Item>
              ))
            : null}
        </Carousel>
      </Container>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectNowPlayingCollections,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDataStart: (url) => dispatch(fetchDataStart(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
