export default async function useStream(timeline, masto) {
  const stream = await masto.v1.stream.streamUser();
  return stream
}
