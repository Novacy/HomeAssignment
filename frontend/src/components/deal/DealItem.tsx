import moment from 'moment'
import { Deal } from '../../types/models'
import DealActivity from './DealActivity'

function DealItem(deal: Deal) {
  const {
    id,
    name,
    account,
    activities,
    last_meeting,
    next_meeting,
    owner,
    stage,
    amount,
  } = deal
  return (
    <>
      <tr className='border-b dark:border-neutral-500'>
        <td className='whitespace-nowrap  px-6 py-4 font-medium'>{id}</td>
        <td className='whitespace-nowrap  px-6 py-4 '>{name}</td>
        <DealActivity
          activities={activities}
          id={id}
          name={name}
          account={account}
          last_meeting={last_meeting}
          next_meeting={next_meeting}
          owner={owner}
          stage={stage}
          amount={amount}
        />
        {/* <td className='whitespace-nowrap  px-6 py-4 '>ACTIVITY</td> */}
        <td className='whitespace-nowrap  px-6 py-4'>
          {moment(last_meeting).format('MMM. Do, YYYY')}
        </td>
        <td className='whitespace-nowrap  px-6 py-4'>
          {moment(next_meeting).format('MMM. Do, YYYY')}
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
