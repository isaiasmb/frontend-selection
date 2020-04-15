import request from '../common/request'

export const getTokens = async () => {
  try {
    return await request.get('/tokens')
  } catch (error) {
    console.error(error)
  }
}

export const changeTokenSelected = async (textId, tokenSelected) => {
  try {
    return await request.patch(`/tokens/${textId}`, { tokenSelected })
  } catch (error) {
    console.error(error)
  }
}
