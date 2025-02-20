import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./sass/main.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import List from "./pages/List";
import Create from "./pages/Create";
import MovieDetails from "./pages/MovieDetails";

const queryClient = new QueryClient();

function App() {
  //--------------------------------------------------------------------
  //------Primjer custom dohvaćanja podataka(koristeći useEffect)-------
  //--------------------------------------------------------------------

  // useEffect(() => {
  //   const fetchTrendingMovies = async () => {
  //     try {
  //       const response = await getTrendingMovies();
  //       console.log(response);
  //     } catch (error) {
  //     }
  //   };

  //   fetchTrendingMovies();
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/details/:id" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
