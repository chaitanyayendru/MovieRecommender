import React from "react";

import NowPlaying from "../../components/now-playing/nowPlayingComponent";
import FeaturedToday from "../../components/featured-today/featuredTodayComponent";
import FanFavorites from "../../components/fan-favorites/fanFavoritesComponent";

function HomePage() {
  return (
    <div className="homepage">
      <NowPlaying />
      <FeaturedToday />
      <FanFavorites />
    </div>
  );
}

export default HomePage;
