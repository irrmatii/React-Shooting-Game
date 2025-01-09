import React, {useState} from 'react';
import './Products.css'



const Products = (props) => {

    const upgrades = [
        {
            image: "https://www.freeiconspng.com/thumbs/potion-icon-png/potion-icon-png-23.png",
            name: "Potion",
            price: 50
        },
        {
            image: "https://www.pngarts.com/files/3/Shooting-Target-PNG-Background-Image.png",
            name: "Attack all Monsters",
            price: 70
        },
        {
            image: "https://tr.rbxcdn.com/180DAY-0b57174a4e8056245ae6715410c36c76/420/420/Image/Png/noFilter",
            name: "2x Damage",
            price: 60
        },
        {
            image: "https://www.pngall.com/wp-content/uploads/5/Real-Monster.png",
            name: "Add Monster",
            price: 50
        },
        {
            image: "https://www.pngall.com/wp-content/uploads/1/Life-Free-PNG-Image.png",
            name: "Ressurect with 50% hp",
            price: 80
        },
        {
            image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2ec970f4-1706-4915-9a93-41f3d9c8202c/dh47d55-f729aeb7-22f5-4311-938d-2c14ba88add5.png/v1/fill/w_848,h_943/blood_strike_golden_vss_png_by_divoras_dh47d55-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI2NSIsInBhdGgiOiJcL2ZcLzJlYzk3MGY0LTE3MDYtNDkxNS05YTkzLTQxZjNkOWM4MjAyY1wvZGg0N2Q1NS1mNzI5YWViNy0yMmY1LTQzMTEtOTM4ZC0yYzE0YmE4OGFkZDUucG5nIiwid2lkdGgiOiI8PTExMzgifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.MjNu6TtRMov8XGAKaJ-aUtGOpojYVy0n9ff0nGm860U",
            name: "Auto attack",
            price: 90
        }
    ]
    const [action, setAction] = useState();


    function Upgrade(upgrade) {
        const action = upgrade

        setAction(upgrade);

        if (action === "Add Monster"){
            props.addMonster(upgrades[3].price)
        } else if (action === "Potion"){
            props.resetLife(upgrades[0].price)
        } else if (action === "Ressurect with 50% hp"){
            props.ressurect(upgrades[4].price)
        } else if (action === "Attack all Monsters"){
            props.allMonsters(upgrades[1].price)
        } else if (action === "2x Damage"){
            props.dblDamage(upgrades[2].price)
        } else if (action === "Auto attack"){
            props.autoAttack(upgrades[5].price)
        }
    }

    return (
        <div className="item_box">
            {upgrades.map((item, index) => (
                <div key={index} className="prdc_box">
                    <div className="img_card" style={{backgroundImage : `url(${item.image})`}}></div>
                    <div className="text_box">
                        <p>{item.name}</p>
                    </div>
                    <button onClick={() => Upgrade(item.name)} className="buyBtn">BUY {item.price}</button>
                </div>
            ))}
        </div>
    );
};

export default Products;