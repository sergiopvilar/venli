export default async function useUpdate(timeline, masto) {
  const limit = 30

  const update = async () => {
    const result = await masto.v1.timelines.listHome({
      limit: limit,
    });

    return result
  }

  const onUpdate = async (callback) => {
    callback(await update())
    setInterval(async () => {
      callback(await update())
    }, (3 * 60 * 1000));
  }

  return {
    onUpdate: onUpdate
  }

}
