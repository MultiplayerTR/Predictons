import React from 'react';
import LeaderboardPage from "./LeaderboardPage";

let usersFromDB = [
    ["user1", "6","4","12"],
    ["user2", "6","3","9"],
    ["user3", "6","2","6"]
];

const LeaguesPage = () => {
    return (
        <div>
            <LeaderboardPage></LeaderboardPage>
        </div>
    );
};

export default LeaguesPage;