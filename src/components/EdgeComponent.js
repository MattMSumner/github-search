import React, { Fragment } from 'react'

const EdgeComponent = ({
  edge: {
    textMatches,
    node: { title, url },
  },
}) => (
  <div>
    <a href={url}>
      <h3>{title}</h3>
    </a>
    <ul>
      {textMatches.map(({ fragment, highlights }, i) => {
        let startingIndice = 0
        const strings = highlights.map(({ beginIndice, endIndice }, j) => {
          const unHighlighted = fragment.slice(startingIndice, beginIndice)
          const highlighted = fragment.slice(beginIndice, endIndice)
          startingIndice = endIndice
          return (
            <Fragment key={j}>
              {unHighlighted} <mark> {highlighted}</mark>
            </Fragment>
          )
        })

        return (
          <li key={i}>
            {strings}
            {fragment.slice(startingIndice)}
          </li>
        )
      })}
    </ul>
  </div>
)

export default EdgeComponent
