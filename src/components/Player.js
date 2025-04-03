import React, {useEffect, useState} from 'react';
import './Player.css'

const Player = (props) => {

    return (
        <div className="player_box">
            <div className="top_col"></div>
            {props.gameOver ? (
                <p>GAME OVER</p>
            ) : (
                <div className="life_bar player_progress">
                    <div className="progress" style={{width: `${props.life}%`}}>{props.life}%</div>
                </div>
            )}
        </div>
    );
};

export default Player;