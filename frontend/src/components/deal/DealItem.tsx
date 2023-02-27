import { Deal } from '../../types/models'

function DealItem(deal: Deal) {
  const { id, name, last_meeting, next_meeting, owner, stage, amount } = deal
  return (
    <>
      <tr className='border-b dark:border-neutral-500'>
        <td className='whitespace-nowrap  px-6 py-4 font-medium'>{id}</td>
        <td className='whitespace-nowrap  px-6 py-4 '>{name}</td>
        <td className='whitespace-nowrap  px-6 py-4 '>ACTIVITY</td>
        <td className='whitespace-nowrap  px-6 py-4'>
          {new Date(last_meeting).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </td>
        <td className='whitespace-nowrap  px-6 py-4'>
          {new Date(next_meeting).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </td>
        <td className='whitespace-nowrap  px-6 py-4'>{owner}</td>
        <td className='whitespace-nowrap  px-6 py-4'>{stage}</td>
        <td className='whitespace-nowrap  px-6 py-4'>&#36;{amount}</td>
        <td className='whitespace-nowrap  px-6 py-4'></td>
      </tr>
    </>
  )
}

export default DealItem
