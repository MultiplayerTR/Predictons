import React from 'react';
import './App.css';
import MainPage from "./MainPage";
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from "./NavBar";
import PredictionPage from "./PredictionPage";
import StorePage from "./StorePage";
import ProfilePage from "./ProfilePage";
import JoinedLeaguesPage from "./JoinedLeaguesPage";
import CreateLeague from "./CreateLeague";
import LeaguesPage from "./LeaguesPage";
import "./button.css";
import "./slots.css";
import "./image.css";
import "./fonts.css"
import TelegramWindow from "./TelegramWindow";

function App() {
  return (
      <Router>
    <div className="App">
        <TelegramWindow />
            <Routes>
                <Route path="/" element={<MainPage/>}></Route>
                <Route path="/predictions" element={<PredictionPage/>}></Route>
                <Route path="/store" element={<StorePage/>}></Route>
                <Route path="/profile" element={<ProfilePage/>}></Route>
                <Route path="/leagues" element={<LeaguesPage/>}></Route>
                <Route path="/leagues/joined" element={<JoinedLeaguesPage/>}></Route>
                <Route path="/leagues/create" element={<CreateLeague/>}></Route>
            </Routes>
        <NavBar></NavBar>

    </div>
      </Router>
  );
}

export default App;