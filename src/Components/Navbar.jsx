import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User, UserPlus } from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const Navbar = () => {
    return (
        <div>
            <div className='bg-lime-800 flex items-center place-content-between h-20'>
                <h1 className='text-6xl font-bold text-emerald-50'
                    data-tooltip-id="brand-tooltip"
                    data-tooltip-content="Back to Purchase"
                >
                    <Link to="/vegies">Vegie Mart </Link></h1>
                <Tooltip id="brand-tooltip" place="bottom" />
                <ul className='flex pr-4 gap-6'>
                    <li>
                        <Link to="/cart">
                            <ShoppingCart size={40}
                                data-tooltip-id="cart-tooltip"
                                data-tooltip-content="View Cart"
                            />
                        </Link>
                        <Tooltip id="cart-tooltip" place="bottom" />
                    </li>
                    <li>
                        <Link to="/account">
                            <User
                                size={40}
                                data-tooltip-id="account-tooltip"
                                data-tooltip-content="Account"
                            />
                        </Link>
                        <Tooltip id="account-tooltip" place="bottom" />
                    </li>
                    <li className='text-4xl'><Link to="/Signup">Sign-Up</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
