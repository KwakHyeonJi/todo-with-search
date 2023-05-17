import styled from 'styled-components'

interface ColoredKeywordProps {
  text: string
  keyword: string
}

const ColoredKeyword = ({ text, keyword }: ColoredKeywordProps) => {
  const regex = new RegExp(keyword, 'gi')
  const words = text.split(regex)
  const origins: string[] = []

  let match
  while ((match = regex.exec(text)) !== null) {
    origins.push(match[0])
    text = text.slice(match.index + keyword.length)
  }

  return (
    <>
      {words.map((word, index) =>
        index > 0 ? (
          <span key={word + index}>
            <Keyword>{origins[index - 1]}</Keyword>
            {word}
          </span>
        ) : (
          <span key={word + index}>{word}</span>
        )
      )}
    </>
  )
}

const Keyword = styled.span`
  color: #2bc9ba;
`

export default ColoredKeyword
