// eslint-disable-next-line import/prefer-default-export
export const getAlreadyCompletedTime = (lastStarted: number, interval: number) => {
  if (lastStarted === 0) return 0
  const target = new Date(lastStarted)
  let lastTargetVal = 0
  while (target.valueOf() < new Date().valueOf()) {
    lastTargetVal = target.valueOf()
    target.setMinutes(target.getMinutes() + interval)
  }
  const lastTarget = new Date(lastTargetVal)
  const diff = new Date().valueOf() - lastTarget.valueOf()
  const minutes = Math.round(diff / 60000)
  return minutes
}
