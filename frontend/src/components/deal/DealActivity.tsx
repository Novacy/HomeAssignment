import React, { useState, useEffect } from 'react'
//@ts-ignore
import HorizontalTimeline from 'react-horizontal-timeline'
import { Activity, Deal } from '../../types/models'

function DealActivity({ activities }: Deal) {
  const [value, setValue] = useState(0)
  const [previous, setPrevious] = useState(0)

  // Values should be only date
  const VALUES = activities?.map((activity: Activity) => {
    return activity.date
  })
  // const VALUES = [
  //   '2008-06-01',
  //   '2010-06-01',
  //   '2013-06-01',
  //   '2015-03-01',
  //   '2019-01-01',
  //   '2019-06-17',
  //   '2019-08-01',
  // ]

  // Description array corresponding to values
  const description = [
    'The event of 1 Jan 2021 : Happy New Year',
    'The event of 15 Jan 2021 : Festival',
    'The event of 22 March 2021 : Board Exam',
  ]

  return (
    <div className='root-div'>
      {' '}
      <div style={{ width: '60%', height: '100px', margin: '0 auto' }}>
        {' '}
        <HorizontalTimeline
          styles={{ outline: '#DFA867', foreground: '#19295C' }}
          index={value}
          indexClick={(index: number) => {
            setValue(index)
            setPrevious(value)
          }}
          values={VALUES}
        />{' '}
      </div>
      {/* <div className='text-center'>{description[value]}</div>{' '} */}
    </div>
  )
}

export default DealActivity
