import React, {useState, useCallback, useEffect} from "react"
import "./ZodiacList.css"
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

const ZodiacList = () => {
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
         <div className="my-4 flex justify-between items-center">
            <SelectDemo
               handleChange={handleChange}
               value={horoscope.language}
            />
            {selectedZodiac && <Button onClick={handleBackClick}>Назад</Button>}
         </div>

         {selectedZodiac ? (
            <Card className="zodiac-description p-4" {...handlers}>
               <h3 className="text-3xl capitalize">
                  {horoscope.language === "translated"
                     ? selectedZodiac
                     : horoscopeKeys?.[selectedZodiac]}
               </h3>
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

export default ZodiacList
