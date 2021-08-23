import { Button } from '@material-ui/core';
import * as Random from 'calgen/util/Random';
import React, { useState } from 'react';

function CalcMultiIndexView() {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)


  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => {
        setLeft(Random.integer(0, 10))
        setRight(Random.integer(0, 10))
      }}>下一题</Button>
      <div className="temp-123">
        <span>{left}</span>
        <span>&nbsp;x&nbsp;</span>
        <span>{right}</span>
        <span>=</span>
      </div>
      
    </div>
  )
}

export default CalcMultiIndexView