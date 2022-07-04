import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";

import WatchlistItem from "../../components/watchlist-item/watchlistItemComponent";
import { selectWatchlistItems } from "../../redux/watchlist/watchlistSelectors";
import { WatchlistSvg } from "../../components/layout/header/headerSvgsComponent";

const WatchlistPage = () => {
  const watchlistItems = useSelector(selectWatchlistItems);

  return (
    <div className="watchlist-page">
      <Container>
        <h2>Your Watchlist</h2>
        <div className="watchlist-items">
          {watchlistItems.length ? (
            watchlistItems.map((item, i) => (
              <WatchlistItem key={i} item={item} />
            ))
          ) : (
            <div className="watchlist-empty">
              <div className="watchlist-icon">
                <WatchlistSvg />
              </div>
              <span>Your Watchlist is empty</span>
              <span>
                Add movies and shows to your Watchlist to keep track of what you
                want to watch.
              </span>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default WatchlistPage;
