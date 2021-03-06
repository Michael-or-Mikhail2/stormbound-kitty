import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

export default React.memo(props =>
  props.href ? (
    <a
      data-testid={props['data-testid']}
      href={props.href}
      className={['CTA', props.new && 'CTA--new', props.className]
        .filter(Boolean)
        .join(' ')}
      target={props.target}
      rel={props.rel}
      aria-label={props['aria-label']}
      download={props.download}
    >
      <span className='CTA__content'>{props.children}</span>
    </a>
  ) : props.to ? (
    <Link
      data-testid={props['data-testid']}
      to={props.to}
      className={['CTA', props.new && 'CTA--new', props.className]
        .filter(Boolean)
        .join(' ')}
      aria-label={props['aria-label']}
    >
      <span className='CTA__content'>{props.children}</span>
    </Link>
  ) : (
    <button
      {...props}
      className={['CTA', props.className].filter(Boolean).join(' ')}
    >
      <span className='CTA__content'>{props.children}</span>
    </button>
  )
)
