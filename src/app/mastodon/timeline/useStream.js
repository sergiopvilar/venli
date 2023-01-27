export default function useStream(timeline, masto) {
  const onStream = async (callback) => {
    const stream = await masto.v1.stream.streamUser();
    stream.on('update', callback)
  }

  return onStream
}
