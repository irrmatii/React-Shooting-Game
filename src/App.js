import './App.css';
import {useEffect, useState} from 'react';
import Monsters from "./components/Monsters";
import Player from "./components/Player";
import Products from "./components/Products";
import mnstr1 from "./components/Thing-from-the-stars-optimized.webp"
import mnstr2 from "./components/Shuffling-horror-optmized.webp"

function App() {

    const [monsterId, setMonsterId] = useState(null)
    const [playerLife, setPlayerLife] = useState(100)
    const damage = [5, 8, 10]
    const [money, setMoney] = useState(100)
    const [autoAttackActive, setAutoAttackActive] =useState(false);

    const [monsters, setMonsters] = useState( [
        {
            monster: "https://www.bogleech.com/vgmonsters/blas-tenpiedad.gif",
            damage: 5,
            id: 0,
            life: 100
        },
        {
            monster: mnstr1,
            damage: 8,
            id: 1,
            life: 100
        },
        {
            monster: mnstr2,
            damage: 10,
            id: 2,
            life: 100
        }
    ])



    function selectMonster(index, health){
        setMonsterId(index); // Track the selected monster's index

    }

    function attack() {
        if (monsterId === null || playerLife <= 0) return;

        let monsterCopy = [...monsters];

        monsterCopy[monsterId].life = Math.max(monsterCopy[monsterId].life - 10, 0)

        if (monsterCopy[3] && monsterCopy[3].life <= 0){
            monsterCopy = monsterCopy.filter((monster, i) => i !== 3);
            setMoney(money + 40);
        } else if(monsterCopy[monsterId].life <= 0){
            monsterCopy[monsterId].life = 100;
            setMoney(money + 40);
        }

        setMonsters(monsterCopy)

    }

    useEffect(() => {
        const interval = setInterval(() => {
            const randIndex = Math.floor(Math.random() * damage.length)
            const monstrDamage = damage[randIndex]
            setPlayerLife(Math.max(playerLife -  monstrDamage, 0))

            console.log(monstrDamage)

            if (playerLife <= 0) {
                clearInterval(interval); // Stop the interval when playerlife reaches 0
            }

            return playerLife;

        }, 4000)

        return () => clearInterval(interval)
    }, [playerLife])

    // ==== Upgrades === //
    function resetLife(price){
        if (playerLife <= 0 || money <= price){
            return
        } else {
            const newMoney = money - price
            setMoney(newMoney)
        }

        if (playerLife === 100){
            return;
        } else{
            setPlayerLife(100);
        }
    }

    function ressurect(price){
        if (playerLife > 0 || money <= price){
            return
        } else {
            const newMoney = money - price
            setMoney(newMoney)
            setPlayerLife(50)
        }
    }

    function dblDamage(price){
        if (playerLife <= 0 || money <= price){
            return
        } else {
            const newMoney = money - price
            setMoney(newMoney)
        }

        let monsterCopy = [...monsters];

        monsterCopy[monsterId].life = Math.max(monsterCopy[monsterId].life - 20, 0)

        if (monsterCopy[3] && monsterCopy[3].life <= 0){
            monsterCopy = monsterCopy.filter((monster, i) => i !== 3);
            setMoney(money + 40);
        } else if(monsterCopy[monsterId].life <= 0){
            monsterCopy[monsterId].life = 100;
            setMoney(money + 40);
        }

        setMonsters(monsterCopy)

    }

    function allMonsters(price){
        if (playerLife <= 0 || money <= price){
            return
        } else {
            const newMoney = money - price
            setMoney(newMoney)
        }

        let monsterCopy = [...monsters];

        monsterCopy.forEach(monster => {
            monster.life = Math.max(monster.life - 10, 0)
        });

        if (monsterCopy[3] && monsterCopy[3].life <= 0){
            monsterCopy = monsterCopy.filter((monster, i) => i !== 3);
            setMoney(money + 40);
        }

        monsterCopy.forEach((monster) => {
            if (monster.life <= 0) {
                monster.life = 100;
                setMoney(money + 40);
            }
        });

        setMonsters(monsterCopy)
    }

    function addMonster(price){
        const extraMnstr = {
            monster: "https://wiki.dfo.world/images/3/3b/Bakal_Raid_Phase_2.gif",
            damage: 10,
            id: 3,
            life: 100
        }

        if (monsters.length > 3 || money <= price){
            return
        } else{
            setMoney(money - price)
            setMonsters((prevMonsters) => [...prevMonsters, extraMnstr]);
        }
    }

    function AutoAttack(price){
        if (playerLife <= 0 || money <= price){
            return
        } else {
            const newMoney = money - price
            setMoney(newMoney)

            setAutoAttackActive(true)
        }
    }
    useEffect(() => {
        if (!autoAttackActive) return;

        const interval = setInterval(() => {
            let monsterCopy = [...monsters];

            monsterCopy.forEach(monster => {
                monster.life = Math.max(monster.life - 10, 0);
            });

            if (monsterCopy[3] && monsterCopy[3].life <= 0){
                monsterCopy = monsterCopy.filter((monster, i) => i !== 3);
                setMoney(money + 40);
            }

            monsterCopy.forEach((monster) => {
                if (monster.life <= 0) {
                    monster.life = 100;
                    setMoney(money + 40);
                }
            });


            if (playerLife <= 0) {
                clearInterval(interval);
                setAutoAttackActive(false);
            }

            setMonsters(monsterCopy)

        }, 1000)

        return () => clearInterval(interval)
    }, [autoAttackActive, monsters, playerLife, monsterId, money])


  return (
    <div className="game">
      <div className="container">
          <div className="game_con">

              <div className="top_con">
                  {monsters.map((monster, i) => (
                      <Monsters key={i}
                                monster={monster.monster}
                                dmg={monster.damage}
                                life={monster.life}
                                isSelected={monsterId === i}
                                selectMonster={() => selectMonster(i)}
                      />
                  ))}
              </div>

              <div className="middle_con">
                  <button onClick={attack} className="attackBtn">🔥 ATTACK 🔥</button>
                  <h2>Money: {money}</h2>
              </div>

              <div className="bottom_con">
                  <div className="left_col">
                      <Player life={playerLife} />
                  </div>
                  <div className="right_col">
                      <Products addMonster={addMonster}
                                resetLife={resetLife}
                                ressurect={ressurect}
                                allMonsters={allMonsters}
                                dblDamage={dblDamage}
                                autoAttack={AutoAttack}
                      />
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
