import React, { useState } from 'react'
import Instance from './Instance'
import Code from './Code'

export default function Example() {
  const [phase, setPhase] = useState("instance")
  const [instance, setInstance] = useState()
  const [code, setCode] = useState()

  const onLogin = () => {
    window.electron.authenticateInstance(instance)
    setPhase('code')
  }

  const onFinish = () => {
    window.electron.authenticateCode(instance, code)
  }

  return (
    <div className="bg-white py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {phase === 'instance' && <Instance instance={instance} setInstance={setInstance} onLogin={onLogin} />}
        {phase === 'code' && <Code instance={instance} code={code} setCode={setCode} onFinish={onFinish} />}
      </div>
    </div>
  )
}
