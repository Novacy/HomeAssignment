import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../app/strore'
import { getDeals, reset } from '../../features/deal/dealSlice'
import Spinner from '../../components/global/Spinner'
import DealItem from '../../components/deal/DealItem'
import { Deal } from '../../types/models'
import { logout } from '../../features/auth/authSlice'

function DealList() {
  const dispatch = useDispatch<AppDispatch>()
  const { deals, isLoading, isSuccess } = useSelector(
    (state: RootState) => state.deal
  )

  const logoutUser = () => {
    dispatch(logout());
    window.location.reload();
  }

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
      <div className='flex justify-between py-1 px-5'>
        DealList
        <button className='rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' onClick={logoutUser}>Logout</button>
      </div>
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
                      className=' py-4'
                      style={{ minWidth: '100px', maxWidth: '100px' }}
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
