import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Activity, Deal } from '../../types/models'

function getday(dateString: string | number | Date) {
  const date = new Date(dateString || '')
  return date.getDate()
}

function DealActivity({ activities }: Deal) {
  // Values should be only date
  return (
    <>
      <td style={{ width: '200px' }}>
        <ul className='activity_timeline_ul_holder'>
          {' '}
          {activities?.map((activity, index) => (
            <li
              key={index}
              className={`item-${getday(activity.date)} ${
                activity.is_inbound ? 'inbound' : 'bound'
              }`}
            >
              <span className='tooltip'>
                {moment(activity.date).format('MMM. Do, YYYY')}
              </span>
            </li>
          ))}{' '}
        </ul>
      </td>
    </>
  )
}

export default DealActivity
