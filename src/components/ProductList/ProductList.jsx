import React, {useState, useCallback, useEffect} from "react"
import "./ProductList.css"
import axios from "axios"
import {useSwipeable} from "react-swipeable"

import Button from "../Button/Button"
import SelectDemo from "../ui/Select"
import {Card} from "../ui/card"

const horoscopeKeys = {
   aries: "овен",
   taurus: "телец",
   gemini: "близнецы",
   cancer: "рак",
   leo: "лев",
   virgo: "дева",
   libra: "весы",
   scorpio: "скорпион",
   sagittarius: "стрелец",
   capricorn: "козерог",
   aquarius: "водолей",
   pisces: "рыбы"
}

const getTotalPrice = (items = []) => {
   return items.reduce((acc, item) => (acc += item.price), 0)
}

const ProductList = () => {
   const [addedItems, setAddedItems] = useState([])
   const [horoscope, setHoroscope] = useState({language: "original"})
   const [horoscopes, setHoroscopes] = useState({})
   const [selectedZodiac, setSelectedZodiac] = useState(null)

   const getHoroscope = async () => {
      try {
         const {data} = await axios.post(
            "https://poker247tech.ru/get_horoscope/",
            horoscope
         )
         setHoroscopes(data)
      } catch (error) {
         console.error("Error fetching horoscope data:", error)
      }
   }

   useEffect(() => {
      getHoroscope()
   }, [horoscope])

   const handleZodiacClick = zodiac => {
      setSelectedZodiac(zodiac)
   }

   const handleBackClick = () => {
      setSelectedZodiac(null)
   }

   const handlers = useSwipeable({
      onSwipedRight: () => setSelectedZodiac(null)
   })

   const handleChange = newValue => {
      setHoroscope(prev => ({...prev, language: newValue}))
   }

   return (
      <div className="product-list-wrapper">
         <SelectDemo handleChange={handleChange} value={horoscope.language} />

         {selectedZodiac ? (
            <Card className="zodiac-description" {...handlers}>
               <Button onClick={handleBackClick}>Назад</Button>
               <p>{horoscopes.horoscopes[selectedZodiac]}</p>
            </Card>
         ) : (
            <ul className="horoscope-list">
               {horoscopes.horoscopes &&
                  Object.keys(horoscopes.horoscopes).map(zodiac => (
                     <li key={zodiac}>
                        <Button
                           className="block  border-r-2"
                           onClick={() => handleZodiacClick(zodiac)}
                        >
                           {horoscope.language === "translated"
                              ? zodiac
                              : horoscopeKeys?.[zodiac]}
                        </Button>
                     </li>
                  ))}
            </ul>
         )}
      </div>
   )
}

export default ProductList
