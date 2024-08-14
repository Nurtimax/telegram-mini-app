import "./App.css"
import {useEffect} from "react"
import {useTelegram} from "./hooks/useTelegram"
import Header from "./components/Header/Header"
import {Route, Routes} from "react-router-dom"
import Form from "./components/Form/Form"
import ZodiacList from "./components/ZodiacList/ZodiacList"

function App() {
   const {onToggleButton, tg} = useTelegram()

   useEffect(() => {
      tg.ready()
   }, [])

   return (
      <div className="App">
         <Header />
         <Routes>
            <Route index element={<ZodiacList />} />
            <Route path={"form"} element={<Form />} />
         </Routes>
      </div>
   )
}

export default App
