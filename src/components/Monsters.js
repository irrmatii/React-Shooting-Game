import React, {useState} from 'react';
import './Monsters.css'

const Monsters = (props) => {

    return (
        <div
            onClick={() => props.selectMonster(props.life)}
            className="monstr_box"
            style={
            {border: props.isSelected ? "3px solid #dc5822" : "1px solid #ccc"}}>
            <div className="img_box" style={{backgroundImage: `url(${props.monster})`}}>
            </div>
            <div className="life_bar mnstr_progress">
                <div className="progress" style={{width : `${props.life}%`}}>{props.life}%</div>
            </div>
            <div className="dmg_info">
                <p>Damage: {props.dmg}</p>
            </div>
        </div>
    );
};

export default Monsters;