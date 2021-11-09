import { useEffect, useRef, useState } from "react";
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
    const headerObj = { "Accept": "application/json", "Content-Type": "application/json" }
    
    const [budgetId, setBudgetId] = useState(null)
    const [percentage, setPercentage] = useState(20);
    const [total, setTotal] = useState(0);
    const [fixedTotal, setFixedTotal] = useState(0)
    const [startProgram, setStartProgram] = useState(false);
    const [foodCount, setFoodCount] = useState(0)
    const [carCount, setCarCount] = useState(0)
    const [shoppingCount, setShoppingCount] = useState(0)
    const [groceryCount, setGroceryCount] = useState(0)
    const [miscCount, setMiscCount] = useState(0)
    const totalRef = useRef(null);
    const expenseRef = useRef(null);

    useEffect(() => {
        if(budget.length){
            setInitial()
        }
    }, [])

    const setInitial = () => {
        const { runningTotal, runningFixedTotal, runningPercentage, runningFoodCount, runningCarCount,
            runningShoppingCount, runningGroceryCount, runningMiscCount, _id
        } = budget[0];
        setBudgetId(_id)
        setTotal(runningTotal)
        setFixedTotal(runningFixedTotal)
        setPercentage(runningPercentage)
        setFoodCount(runningFoodCount)
        setCarCount(runningCarCount)
        setShoppingCount(runningShoppingCount)
        setGroceryCount(runningGroceryCount)
        setMiscCount(runningMiscCount)
        setStartProgram(true)
    }

    console.log(total)

    

    const categories = [
        { name: "food", badgeCount: foodCount, icon: faPizzaSlice},
        { name: "grocery", badgeCount: groceryCount, icon: faCartPlus},
        { name: "car", badgeCount: carCount, icon: faCar},
        { name: "shopping", badgeCount: shoppingCount, icon: faShoppingBag},
        { name: "misc", badgeCount: miscCount, icon: faEllipsisH},
    ]
    
    const fetchBudget = async () => {

        const budgetObj = await getBudget();
        const { runningTotal, runningFixedTotal, runningPercentage, runningFoodCount, runningCarCount,
            runningShoppingCount, runningGroceryCount, runningMiscCount, _id
        } = budgetObj[0];
        setBudgetId(_id)
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

        fetchBudget();
    }


    const addExpense = async (e) => {
        e.preventDefault()

        const expense = parseInt(expenseRef.current.value)
        const calculatedPercentage = (expense / fixedTotal) * 100;
        console.log(calculatedPercentage)
        try {
            await fetch(`http://localhost:3000/api/budget/${budgetId}`, {
                method: "PUT",
                headers: headerObj,
                body: JSON.stringify({ 
                    runningPercentage: percentage - calculatedPercentage,
                    runningTotal: total - expense
                })
            })
            await fetchBudget()
        } catch (error) {
            console.log(error)
        }

        expenseRef.current.value = "";
    }

    const fetchBadgeCount = async(updateObj) => {
         try {
            await fetch(`http://localhost:3000/api/budget/${budgetId}`, {
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

    const resetBudget = async() => {
        try {
            await fetch(`http://localhost:3000/api/budget/${budgetId}`, {
                method: "DELETE",
                headers: headerObj
            })
            setStartProgram(false)
            setTotal(0);
            setBudgetId(null)
            setPercentage(20);
            setFoodCount(0);
            setCarCount(0);
            setShoppingCount(0);
            setGroceryCount(0);
            setMiscCount(0);
        } catch (error) {
            console.log(error)
        }

    }

    return(
        <div className={s.container}> 
            <div>
                <div className={s.budgetMeterContainer}>
                    <div className={`${s.budgetMeter} ${percentage && s.gradientStyle}`} style={{ height: `${percentage}%` }}>
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
                    { total > 0 && 
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
                        <div onClick={resetBudget} className={s.resetBtn}>reset budget</div>
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