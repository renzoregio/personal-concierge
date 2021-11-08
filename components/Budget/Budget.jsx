import { useRef, useState } from "react";
import s from "./Budget.module.css"
import { BackToMain } from "../Home";

import fetch from 'isomorphic-unfetch';


import { faCheckCircle, faDollarSign, faCar, faCartPlus, faPizzaSlice, faEllipsisH, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const getBudget = async () => {
    const res = await fetch("http://localhost:3000/api/budget");
    const { budget } = await res.json();
    return budget 
}

const Budget = ({ budget }) => {
    const { runningFixedTotal, runningTotal, runningPercentage, runningFoodCount, runningCarCount,
    runningShoppingCount, runningGroceryCount, runningMiscCount, _id
    } = budget[0];

    const dynamicUrl = `http://localhost:3000/api/budget/${_id}`
    const headerObj = { "Accept": "application/json", "Content-Type": "application/json" }

    const [percentage, setPercentage] = useState(runningPercentage);
    const [total, setTotal] = useState(runningTotal);
    const [fixedTotal, setFixedTotal] = useState(runningFixedTotal)
    const [startProgram, setStartProgram] = useState(fixedTotal > 0 ? true : false);
    const [foodCount, setFoodCount] = useState(runningFoodCount)
    const [carCount, setCarCount] = useState(runningCarCount)
    const [shoppingCount, setShoppingCount] = useState(runningShoppingCount)
    const [groceryCount, setGroceryCount] = useState(runningGroceryCount)
    const [miscCount, setMiscCount] = useState(runningMiscCount)


    const categories = [
        { name: "food", badgeCount: foodCount, icon: faPizzaSlice},
        { name: "grocery", badgeCount: groceryCount, icon: faCartPlus},
        { name: "car", badgeCount: carCount, icon: faCar},
        { name: "shopping", badgeCount: shoppingCount, icon: faShoppingBag},
        { name: "misc", badgeCount: miscCount, icon: faEllipsisH},
    ]

    const totalRef = useRef(null);
    const expenseRef = useRef(null);
    
    const fetchBudget = async () => {

        const budgetObj = await getBudget();
        const { runningTotal, runningPercentage, runningFoodCount, runningCarCount,
            runningShoppingCount, runningGroceryCount, runningMiscCount
        } = budgetObj[0];

        setTotal(runningTotal);
        setPercentage(runningPercentage);
        setFoodCount(runningFoodCount);
        setCarCount(runningCarCount);
        setShoppingCount(runningShoppingCount);
        setGroceryCount(runningGroceryCount);
        setMiscCount(runningMiscCount);
    } 

    const setBudgetFn = async (e) => {
        e.preventDefault()

        try {
            await fetch("http://localhost:3000/api/budget", {
                method: "POST",
                headers: headerObj,
                body: JSON.stringify({ 
                    runningFixedTotal: +totalRef.current.value,
                    runningTotal: +totalRef.current.value
                 })
            })
        } catch (error) {
            console.log(error)
        }


        setTotal(totalRef.current.value)
        setPercentage(100);
        setFixedTotal(total)
    }


    const addExpense = async (e) => {
        e.preventDefault()

        const expense = parseInt(expenseRef.current.value)
        const calculatedPercentage = (expense / fixedTotal) * 100;

        try {
            await fetch(dynamicUrl, {
                method: "PUT",
                headers: headerObj,
                body: JSON.stringify({ 
                    runningPercentage: percentage - calculatedPercentage,
                    runningTotal: total - expense
                })
            })
            fetchBudget();
        } catch (error) {
            console.log(error)
        }

        
        expenseRef.current.value = "";
    }

    const fetchBadgeCount = async(updateObj) => {
         try {
            await fetch(dynamicUrl, {
                method: "PUT",
                headers: headerObj,
                body: JSON.stringify(updateObj)
            })
            fetchBudget();
        } catch (error) {
            console.log(error)
        }
    }

    const incrementCategoryBadgeCount = (iconName) => {
        if(iconName === "food"){
            fetchBadgeCount({ runningFoodCount: foodCount + 1})
        } else if (iconName === "grocery"){
            fetchBadgeCount({ runningGroceryCount: groceryCount + 1})
        } else if (iconName === "car") {
            fetchBadgeCount({ runningCarCount: carCount + 1})
        } else if (iconName === "shopping"){
            fetchBadgeCount({ runningShoppingCount: shoppingCount + 1})
        } else {
            fetchBadgeCount({ runningMiscCount: miscCount + 1})
        }
    }

    return(
        <div className={s.container}> 
            <div>
                <div className={s.budgetMeterContainer}>
                    <div className={!percentage ? s.defaultBudgetMeter : s.budgetMeter} style={{ height: `${percentage}%` }}>
                        <h1 className={s.totalMeter}>${total}</h1>
                    </div>
                </div>

                <div>
                    { !startProgram && <button onClick={() => {setStartProgram(true)}}  className={s.startBtn}>Start Budgeting</button>}
                    { startProgram && !total &&
                    <> 
                        <h1 className={s.title}>What's your budget?</h1>
                        <form className={s.form}>
                            <input className={s.textBox} type="text" ref={totalRef} />
                            <button onClick={(e) => setBudgetFn(e)} className={s.submitBtn}>
                                <FontAwesomeIcon className={s.icon} icon={faCheckCircle} size="2x" />
                            </button>
                        </form>
                    </>}
                    { total && 
                    <div className={s.expenseContainer}>
                        <h1 className={s.title}>What's your expense?</h1>
                        <div className={s.categories}>
                            {categories.map((category, i) => (
                                <div className={s.categoryContainer} key={i} onClick={() => incrementCategoryBadgeCount(category.name)}>
                                    <FontAwesomeIcon className={s.icon} size="2x" icon={category.icon}/>
                                    <span className={s.badge}>{category.badgeCount}</span>
                                </div>
                            ))}
                        </div>
                        <form className={s.form}>
                            <button className={s.submitBtn} onClick={(e) => addExpense(e)}>
                                <FontAwesomeIcon className={s.icon} size="2x" icon={faDollarSign} />
                            </button>
                            <input className={s.textBox} ref={expenseRef} type="text"/>
                        </form>
                        <div className={s.resetBtn}>reset budget</div>
                    </div>
                    }
                </div>
            </div>
            <BackToMain />
        </div>
    )
}

Budget.getInitialProps = async () => {
    const budget = await getBudget();
    return { budget } 
}

export default Budget;