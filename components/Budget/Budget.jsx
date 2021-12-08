import { useEffect, useRef, useState } from "react";
import s from "./Budget.module.css"
import {getSession} from "next-auth/client"
import fetch from 'isomorphic-unfetch';
import { LoadingPage } from "../Loading";
import  { Nav }  from "../Nav"
import icons from "../../icons";




const Budget = () => {
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
    const [error, setError] = useState(false)
    const [generateReport, setGenerateReport] = useState(false)
    const [badges, setBadges] = useState([]);
    const [topExpenses, setTopExpenses] = useState([])
    const totalRef = useRef(null);
    const expenseRef = useRef(null);
    const [username, setUsername]= useState("")
    

    useEffect(async () => {
        const userObj = await getSession();
        setUsername(userObj.user.name)
        const budget = await getBudget(userObj.user.name);
        if(budget.length){
            setInitial(budget)
        }
    }, [])

    const getBudget = async (user) => {
        const res = await fetch("http://localhost:3000/api/budget", {
            method: "GET",
            headers: {
                "Accept": "application/json", 
                "Content-Type": "application/json",
                "User": user
            }
        });
        const { budget } = await res.json();
        return budget 
    }

    const setInitial = (budget) => {
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

    const categories = [
        { name: "food", badgeCount: foodCount, icon: icons.pizzaSlice2x},
        { name: "grocery", badgeCount: groceryCount, icon: icons.cartPlus2x},
        { name: "car", badgeCount: carCount, icon: icons.car2x},
        { name: "shopping", badgeCount: shoppingCount, icon: icons.shoppingBag2x},
        { name: "misc", badgeCount: miscCount, icon: icons.ellipsisH2x},
    ]
    
    const fetchBudget = async () => {
        const budgetObj = await getBudget(username);
        const { runningTotal, runningFixedTotal, runningPercentage, runningFoodCount, runningCarCount,
            runningShoppingCount, runningGroceryCount, runningMiscCount, _id
        } = budgetObj[0];
        setBudgetId(_id)
        setFixedTotal(runningFixedTotal);
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
                    runningPercentage: 100,
                    runningFixedTotal: +totalRef.current.value,
                    runningTotal: +totalRef.current.value,
                    user: username
                 }),
            })
        } catch (error) {
            console.log(error)
        }

        fetchBudget();
    }


    const addExpense = async (e) => {
        e.preventDefault()
        const amountEntered = parseInt(expenseRef.current.value);
        if(amountEntered <= total){
            const expense = amountEntered
            const calculatedPercentage = (expense / fixedTotal) * 100;
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
        } else {
            setError(true)
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

    const getTopExpenses = () => {
        const badges = [foodCount, groceryCount, carCount, shoppingCount, miscCount]
        const mostExpenses = []
        const maxNum = Math.max(...badges) 
        for(let i = 0; i < badges.length; i++){
            if(badges[i] === maxNum){
                mostExpenses.push(i);
            }
        }
        setTopExpenses([...mostExpenses]);
    }

    const createReport = async() => {
        await fetchBudget();
        setBadges([foodCount, groceryCount, carCount, shoppingCount, miscCount])
        getTopExpenses()
        setGenerateReport(true)
    }

    const removeReport = async ()=> {
        await resetBudget();
        setGenerateReport(false)
    }
    return(
        <>
        <LoadingPage />
        <Nav hide={false}/>
        <div className={s.container}> 
            { !generateReport && 
                <div className={s.budgetContainer}>
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
                            <form className={s.getBudgetForm}>
                                <input className={s.textBox} type="text" ref={totalRef} />
                                <button onClick={(e) => setBudgetFn(e)} className={s.submitBtn}>
                                    { icons.checkCircle2x }
                                </button>
                            </form>
                        </>}
                        { total > 0 && 
                        <div className={s.expenseContainer}>
                            <h1 className={s.title}>What's your expense?</h1>
                            <div className={s.categories}>
                                {categories.map((category, i) => (
                                    <div className={s.categoryContainer} key={i} onClick={() => incrementCategoryBadgeCount(category.name)}>
                                        { category.icon }
                                        <span className={s.badge}>{category.badgeCount}</span>
                                    </div>
                                ))}
                            </div>
                            <form className={s.form}>
                                <div className={s.expense}>
                                    <button className={s.submitBtn} onClick={(e) => addExpense(e)}>
                                        { icons.dollarSign2x }
                                    </button>
                                    <input className={s.textBox} ref={expenseRef} type="text"/>
                                </div>
                                { error && <div className={s.errorMessage}>
                                    <span>ERROR: You entered a number that is larger than the total</span>
                                </div>}
                            </form>
                            <div onClick={resetBudget} className={s.resetBtn}>reset budget</div>
                            { !generateReport && <button onClick={createReport} className={s.generateReportBtn}>Generate Report</button>}
                        </div>
                        }
                    </div>
                </div>
            }
            {generateReport && 
                <div className={generateReport ? s.reportContainerStart : s.reportContainerEnd}>
                        <h1>YOUR BUDGET REPORT</h1>
                        <div className={s.reportMainText}>
                            <span>starting budget</span>
                            <span>${fixedTotal}</span>
                        </div>
                        { categories.map((category, i) => (
                            <div key={i} className={s.reportCategory}>
                                <span>{category.name}</span>
                                <span>{badges[i]}</span>
                            </div>
                        ))}
                        <div className={s.reportMainText}>
                            <span>savings</span>
                            <span>${total}</span>
                        </div>
                        <h1>Top Expenses</h1>
                        {topExpenses.map((expense, i) => (
                            <div key={i} className={s.reportMainText} style={{justifyContent: "center", alignItems: "center"}}>
                                <div style={{marginRight: "20px"}}>
                                 { icons.dollarSign }
                                </div>
                                <span>{categories[expense].name}</span>
                            </div>
                        ))}
                        <div></div>
                        <div onClick={() => removeReport()} className={s.reportCloseBtn}>
                            { icons.timesCircle2x }
                        </div>
                </div>
            }
        </div>
        </>
    )
}

export default Budget;