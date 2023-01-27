import ImageBridge from "../..//bridge/ImageBridge"

export default async function useBridge(toot) {
    const bridge = new ImageBridge()
    const status = toot.reblog ? toot.reblog : toot

    const avatar = await bridge.cache(status.account.avatar, `${status.id}_avatar`, 'png')
    const medias = []

    const imageMedias = status.mediaAttachments.filter((m) => m.type == 'image')
    for(var i in imageMedias) {
      const media = imageMedias[i]
      medias.push(await bridge.cache(media.url, `media_${media.id}`, 'jpeg'))
    }

    return {
      avatar: avatar,
      medias: medias
    }
}
