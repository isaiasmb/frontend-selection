import React, { useState, useEffect } from 'react'
import TextSelection from 'components/TextSelection'
import * as api from './api'
import * as S from './styled'

const App = () => {
  const [text, setText] = useState(null)

  useEffect(() => {
    async function fetchData () {
      const resp = await api.getTokens()
      console.log(resp)
      if (resp && resp.data && resp.data.length) {
        setText(resp.data[0])
      }
    }
    fetchData()
  }, [])

  return (
    <S.MainWrapper>
      <S.MainTitle>
        Bandyer Frontend selection home assignment
        <S.MainSubtitle>
          Task 1
        </S.MainSubtitle>
      </S.MainTitle>
      <S.MainDescription>
        The user must be able to select a substring of the text document and persist the selection to the server.
      </S.MainDescription>
      <S.Main>
        <TextSelection
          text={text ? text.text : ''}
          tokenSelected={text ? text.tokenSelected : null}
          onChange={async tokenSelected => {
            const resp = await api.changeTokenSelected(text._id, tokenSelected)
            if (resp && resp.data) {
              setText(resp.data)
            }
          }} />
      </S.Main>
    </S.MainWrapper>
  )
}

export default App
