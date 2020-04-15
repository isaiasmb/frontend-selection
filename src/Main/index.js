import React, { useState, useEffect } from 'react'
import TextSelection from 'components/TextSelection'
import * as api from './api'
import * as S from './styled'

const App = () => {
  const [text, setText] = useState(null)

  useEffect(() => {
    async function fetchData () {
      const resp = await api.getTokens()
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
          Task 2
        </S.MainSubtitle>
      </S.MainTitle>
      <S.MainDescription>
        The user must be able to select multiple selected tokens of the text document and persist the selections to the server. A token can be deselected.
      </S.MainDescription>
      <S.Main>
        <TextSelection
          text={text ? text.text : ''}
          tokenSelecteds={text ? text.tokenSelecteds : []}
          onChange={async tokenSelecteds => {
            const resp = await api.changeTokenSelected(text._id, tokenSelecteds)
            if (resp && resp.data) {
              setText(resp.data)
            }
          }} />
      </S.Main>
    </S.MainWrapper>
  )
}

export default App
