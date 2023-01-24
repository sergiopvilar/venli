import React from 'react'
import Header from './Header'

export default function({instance, setInstance, onLogin}) {

  return (
    <>

      <Header
        title="Welcome to Venli!"
        subtitle="Venli is a Mastodon client for the macOS. Enter below the URL for your mastodon instance:"
      />

      <div className="mt-8 flex rounded-md shadow-sm">
        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
          http://
        </span>
        <input
          type="text"
          name="company-website"
          id="company-website"
          className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="example.com"
          value={instance}
          onChange={(e) => setInstance(e.target.value)}
        />
      </div>

      <div className="sm:text-center mt-4">
        <button
          type="button"
          className={`items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-lg text-white shadow-sm ${instance ? 'hover:bg-indigo-700' : ''} focus:outline-none disabled:opacity-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full`}
          disabled={!instance ? 'disabled' : ''}
          onClick={onLogin}
        >
          {instance ? `Login with ${instance}` : 'Login'}
        </button>
      </div>
    </>
  )

}
