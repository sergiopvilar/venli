import React from 'react'

export default function({title, subtitle}) {
  return (
    <div className="sm:text-center">
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</p>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
        {subtitle}
      </p>
    </div>
  )
}
