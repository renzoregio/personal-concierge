import { useRef, useState } from "react";
import s from "./Budget.module.css"
import { BackToMain } from "../Home";


import { faCheckCircle, faDollarSign, faCar, faCartPlus, faPizzaSlice, faEllipsisH, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const Budget = () => {
    const [percentage, setPercentage] = useState(null);
    const [total, setTotal] = useState(null);
    const [fixedTotal, setFixedTotal] = useState(0)
    const [startProgram, setStartProgram] = useState(false);
    const [foodCount, setFoodCount] = useState(0)
    const [carCount, setCarCount] = useState(0)
    const [shoppingCount, setShoppingCount] = useState(0)
    const [groceryCount, setGroceryCount] = useState(0)
    const [miscCount, setMiscCount] = useState(0)

    const totalRef = useRef(null);
    const expenseRef = useRef(null);
    
    const setBudgetFn = (e) => {
        e.preventDefault()
        setTotal(totalRef.current.value)
        setPercentage(100);
        setFixedTotal(totalRef.current.value)
    }


    const addExpense = (e) => {
        e.preventDefault()
        const expense = parseInt(expenseRef.current.value)
        const calculatedPercentage = (expense / fixedTotal) * 100;
        setPercentage(percentage - calculatedPercentage)
        setTotal(total - expense)
        expenseRef.current.value = "";
    }

    const categories = [
        { name: "food", badgeCount: foodCount, icon: faPizzaSlice},
        { name: "grocery", badgeCount: groceryCount, icon: faCartPlus},
        { name: "car", badgeCount: carCount, icon: faCar},
        { name: "shopping", badgeCount: shoppingCount, icon: faShoppingBag},
        { name: "misc", badgeCount: miscCount, icon: faEllipsisH},
    ]

    const incrementCount = (iconName) => {
        if(iconName === "food"){
            setFoodCount((prev) => prev += 1)
        } else if (iconName === "grocery"){
            setGroceryCount((prev) => prev += 1)
        } else if (iconName === "car") {
            setCarCount((prev) => prev += 1)
        } else if (iconName === "shopping"){
            setShoppingCount((prev) => prev += 1)
        } else {
            setMiscCount((prev) => prev += 1)
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
                                <div className={s.categoryContainer} key={i} onClick={() => incrementCount(category.name)}>
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

export default Budget;