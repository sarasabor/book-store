import React from 'react'
import { Link } from 'react-router-dom'

const LeftSection = () => {
  return (
    <div>
        <section>
            <Link to='/'>
                <h1 className='font-bold text-[1.4rem] text-orange-600'>
                    Books Store
                </h1>
            </Link>
        </section>
    </div>
  )
}

export default LeftSection