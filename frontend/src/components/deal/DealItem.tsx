import React from 'react'
import { Deal } from '../../types/models'

function DealItem(deal: any) {
  return (
    <div>
      <tr className='border-b dark:border-neutral-500'>
        <td className='whitespace-nowrap  px-6 py-4 font-medium'>2</td>
        <td className='whitespace-nowrap  px-6 py-4 '>{deal.name}</td>
        <td className='whitespace-nowrap  px-6 py-4'>{deal.amount}</td>
        <td className='whitespace-nowrap  px-6 py-4'>@fat</td>
      </tr>
    </div>
  )
}

export default DealItem
