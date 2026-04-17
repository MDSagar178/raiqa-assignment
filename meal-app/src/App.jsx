import {useState,useEffect} from "react"
import meals from "./data/meals"
import MealItem from "./components/MealItem"
import SelectedMeals from  "./components/SelectedMeals"
import "./App.css"

function App() {

const [showAll,setShowAll]=useState(false)

const [selectedMeals,setSelectedMeals]=useState(()=> {
 try{
  const data=localStorage.getItem("selectedMeals")
  return data?JSON.parse(data): []
 }catch(e){
  return [ ]
 }
})

const [ sortOrder,setSortOrder]=useState(null)

useEffect(()=>{
 localStorage.setItem("selectedMeals",JSON.stringify(selectedMeals))
}, [selectedMeals])

const addMeal=(meal)=>{
 let found=false
 for(let i=0;i<selectedMeals.length; i++){
  if(selectedMeals[i].id===meal.id) {
   found=true
   break
  }
 }
 if(found) return

 setSelectedMeals([...selectedMeals,meal])
}

const removeMeal=(id)=>{
 const newList=selectedMeals.filter(item=>item.id!==id)
 setSelectedMeals(newList)

}

const resetMeals=()=>{
 setSelectedMeals([])
}

const changeSort=()=>{
 if(sortOrder==="low"){
  setSortOrder("high")
 }
 else{
  setSortOrder("low")

 }
}

let list=showAll? [...meals] : meals.filter(x=>x.available)

if(sortOrder==="low"){
 list.sort((a,b)=>a.price-b.price)

}

else if(sortOrder==="high"){
 list.sort((a,b)=>b.price-a.price)

}

const getLabel=()=>{
 if(sortOrder==="low") return "↑ Low → High"
 if(sortOrder==="high") return "↓ High → Low"
 return "Sort by Price"

}

return(
<div className="container">

<div className="app-header">
<h1>🧆Homely <span>Meals</span> Hub 🍛</h1>
<p>Simple app for homemade meals selection</p>

</div>


<div className="controls">

<button onClick={()=>setShowAll(!showAll)} className="toggle-btn">
{showAll?"Show Available Only":"Show All Meals"}

</button>

<button onClick={changeSort} className="sort-btn">
{getLabel()}
</button>
</div>

<div className="meal-grid">
{list.map((meal)=>(
<MealItem
 key={meal.id}
 meal={meal}
 onAdd={addMeal}

 isAdded={selectedMeals.some(m=>m.id===meal.id)}
/>
))}
</div>

<div className="section-divider"></div>

<SelectedMeals
 selected={selectedMeals}
 onRemove={removeMeal}
 onReset={resetMeals}
 
/>

</div>
)
}

export default App