import React from 'react';
import './App.css';
import MainPage from "./MainPage";
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from "./NavBar";
import PredictionPage from "./PredictionPage";
import StorePage from "./StorePage";
import ProfilePage from "./ProfilePage";
import LeaguesPage from "./LeaguesPage";
import CreateLeague from "./CreateLeague";
import LeaderboardPage from "./LeaderboardPage";

function App() {
  return (
      <Router>
    <div className="App">

            <Routes>
                <Route path="/" element={<MainPage/>}></Route>
                <Route path="/predictions" element={<PredictionPage/>}></Route>
                <Route path="/store" element={<StorePage/>}></Route>
                <Route path="/profile" element={<ProfilePage/>}></Route>
                <Route path="/leagues" element={<LeaguesPage/>}></Route>
                <Route path="/leagues/create" element={<CreateLeague/>}></Route>
                <Route path="/leagues/test" element={<LeaderboardPage/>}></Route>
            </Routes>

        <NavBar></NavBar>

    </div>
      </Router>
  );
}

export default App;