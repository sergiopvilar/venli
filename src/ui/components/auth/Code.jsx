import React from 'react'
import Header from './Header'

export default function ({ instance, code, setCode, onFinish }) {

  return (
    <>

      <Header
        title="Almost there..."
        subtitle={`Please paste below the code you got from ${instance}:`}
      />

      <div className="mt-8 flex rounded-md shadow-sm">
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <div className="sm:text-center mt-4">
        <button
          type="button"
          className={`items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-lg text-white shadow-sm ${instance ? 'hover:bg-indigo-700' : ''} focus:outline-none disabled:opacity-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full`}
          disabled={!code ? 'disabled' : ''}
          onClick={onFinish}
        >
          Finish Setup
        </button>
      </div>
    </>
  )

}
