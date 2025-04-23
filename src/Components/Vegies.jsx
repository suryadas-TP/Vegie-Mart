import React from 'react'
import img1 from '../assets/Images/beans.jpg'
import img2 from '../assets/Images/beetroot.jpg'
import img3 from '../assets/Images/brinjal.jpg'
import img4 from '../assets/Images/cabage.jpg'
import img5 from '../assets/Images/capsicum.jpg'
import img6 from '../assets/Images/carrot.jpg'
import img7 from '../assets/Images/cauliflower.jpg'
import img8 from '../assets/Images/corianderleaf.jpg'
import img9 from '../assets/Images/cucumber.jpg'
import img10 from '../assets/Images/curryleaf.jpg'
import img11 from '../assets/Images/garlic.jpg'
import img12 from '../assets/Images/ginger.jpg'
import img13 from '../assets/Images/ladiesfinger.jpg'
import img14 from '../assets/Images/lemon.jpg'
import img15 from '../assets/Images/onion.jpg'
import img16 from '../assets/Images/potato.jpg'
import img17 from '../assets/Images/pumpkin.jpg'
import img18 from '../assets/Images/tomato.jpg'
import img19 from '../assets/Images/chilli.jpg'
import img20 from '../assets/Images/keralaCucumber.jpg'
import Navbar from './Navbar'
import { useDispatch } from 'react-redux'
import { addTocart } from '../redux/cartSlice'

let data = [
  {
    id:1,
    name: 'Kerala_Cucumber',
    price: '60',
    image: img20
  },
  {
    id:2,
    name: 'Chilli',
    price: '80',
    image: img19
  },
  {
    id:3,
    name: 'Beans',
    price: '40',
    image: img1
  },
  {
    id:4,
    name: 'Beetroot',
    price: '50',
    image: img2
  },
  {
    id:5,
    name: 'Brinjal',
    price: '40',
    image: img3
  },
  {
    id:6,
    name: 'Cabage',
    price: '30',
    image: img4
  },
  {
    id:7,
    name: 'Capsicum',
    price: '80',
    image: img5
  },
  {
    id:8,
    name: 'Carrot',
    price: '60',
    image: img6
  },
  {
    id:9,
    name: 'Cauliflower',
    price: '45',
    image: img7
  },
  {
    id:10,
    name: 'Coriander leaf',
    price: '10',
    image: img8
  },
  {
    id:11,
    name: 'Cucumber',
    price: '55',
    image: img9
  },
  {
    id:12,
    name: 'Curry leaf',
    price: '10',
    image: img10
  },
  {
    id:13,
    name: 'Garlic',
    price: '70',
    image: img11
  },
  {
    id:14,
    name: 'Ginger',
    price: '48',
    image: img12
  },
  {
    id:15,
    name: 'Ladies finger',
    price: '40',
    image: img13
  },
  {
    id:16,
    name: 'Lemon',
    price: '60',
    image: img14
  },
  {
    id:17,
    name: 'Onion',
    price: '45',
    image: img15
  },
  {
    id:18,
    name: 'Potato',
    price: '40',
    image: img16
  },
  {
    id:19,
    name: 'Pumpkin',
    price: '35',
    image: img17
  },
  {
    id:20,
    name: 'Tomato',
    price: '30',
    image: img18
  },
]


const Vegies = () => {
  
  const dispatch = useDispatch()

  const cartHandle = (vegie) => {
    dispatch(addTocart(vegie))

    alert(`${vegie.name} added to cart`)
  }
  return (
    <div>
      
      <Navbar/>
      
     
      <div className='flex justify-center items-center '>
        <h1 className='text-5xl flex justify-center mt-6 border-1 w-90 text-orange-700 font-bold  rounded-2xl bg-green-900 p-4'>Select vegies </h1>
      </div>
      <div className='flex flex-wrap p-7 justify-center mb-2 gap-4 mt-2'>
        {
          data.map((vegie) => {
            return (


              <div>
                <img className='size-76 border-1 border-amber-800 rounded-3xl' src={vegie.image} alt="vegetables" />
                <div className='text-center gap-1 pt-2'>
                  <h5 className='font-extrabold text-orange-600'>{vegie.name} - {vegie.price} {"\u20B9"}</h5>
                  <button className='font-serif border-1 p-0.5 cursor-pointer rounded-es-2xl bg-gray-300 hover:font-mono' onClick={()=>cartHandle(vegie)}>Add to Cart</button>
                </div>
              </div>


            )
          })
        }
      </div>
    </div>
  )
}

export default Vegies
