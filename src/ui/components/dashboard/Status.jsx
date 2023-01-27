import React from 'react'

export default function({data}) {
  const status = data.reblog ? data.reblog : data
  const height = (index, size) => {
    return size == 1 ? '400px' : '300px'
  }
  const width = (index, size) => {
    if(size == 1) return '100%'
    if(size == 2) return '50%'
    if(size == 3) {
      if(index == 0) return '100%'
      if(index > 0) return '50%'
    }

    return '50%'
  }

  const maxHeight = (size) => {
    if(size === 1) return '290px'
    if(size === 2) return '270px'
    return '570px'
  }

  return (
    <div className="flex space-x-3">
      <img className="h-12 w-12 rounded-full" src={data.images.avatar} alt="" />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{status.account.displayName} {status.index}</h3>
          <p className="text-sm text-gray-500">{status.timeAgo}</p>
        </div>
        <p className="text-sm text-gray-500" dangerouslySetInnerHTML={{ __html: status.content }}></p>
        {data.images.medias.length > 0 && <div className="rounded-lg" style={{overflow: 'hidden', maxHeight: maxHeight(data.images.medias.length)}}>
          {data.images.medias.map((img, index) => (
            <div key={index} style={{display: 'inline-block', width: width(index, data.images.medias.length), maxHeight: height(index, data.images.medias.length), overflow: 'hidden'}}>
              <img src={img} />
            </div>
          ))}
        </div>}
        {data.reblog && <p className="pt-5 text-xs text-gray-500">Boosted by {data.account.displayName} {data.timeAgo}</p>}
      </div>
    </div>
  )
}
