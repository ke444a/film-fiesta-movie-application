import MainHeader from "../components/MainHeader";
import MovieList from "../components/MovieList";

const Home = () => {
  return (
    <main className="pb-6 md:pb-10 xl:pb-20">
      <MainHeader />
      <MovieList theme="trending" />
      <MovieList theme="top_rated" />
    </main>
  );
};

export default Home;
