import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../app/strore'
import { getDeals, reset } from '../../features/deal/dealSlice'
import Spinner from '../../components/global/Spinner'
import DealItem from '../../components/deal/DealItem'
import { Deal } from '../../types/models'

function DealList() {
  const dispatch = useDispatch<AppDispatch>()
  const { deals, isLoading, isSuccess } = useSelector(
    (state: RootState) => state.deal
  )

  useEffect(() => {
    dispatch(getDeals({}))
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])
  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <div>DealList</div>
      <div className='flex flex-col'>
        <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='overflow-hidden'>
              <table className='min-w-full text-center text-sm font-light'>
                <thead className='border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800'>
                  <tr>
                    <th scope='col' className=' px-6 py-4'>
                      #
                    </th>
                    <th scope='col' className=' px-6 py-4'>
                      Deal
                    </th>
                    <th
                      scope='col'
                      className=' px-6 py-4'
                      style={{ minWidth: '500px' }}
                    >
                      Activity
                    </th>
                    <th scope='col' className=' px-6 py-4'>
                      Last Activity
                    </th>
                    <th scope='col' className=' px-6 py-4'>
                      Next Activity
                    </th>
                    <th scope='col' className=' px-6 py-4'>
                      Owner
                    </th>
                    <th scope='col' className=' px-6 py-4'>
                      Stage
                    </th>
                    <th scope='col' className=' px-6 py-4'>
                      Amount
                    </th>
                    <th scope='col' className=' px-6 py-4'></th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal: Deal) => (
                    <DealItem
                      key={deal.id}
                      id={deal.id}
                      name={deal.name}
                      owner={deal.owner}
                      stage={deal.stage}
                      account={deal.account}
                      activities={deal.activities}
                      last_meeting={deal.last_meeting}
                      next_meeting={deal.next_meeting}
                      amount={deal.amount}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DealList
