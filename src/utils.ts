import React from 'react'

const highlightSearchTerm = (text: string, term: string) => {
  if (term.length === 0) {
    return text
  }

  const regex = new RegExp(`(${term})`, "gi")
  const parts = text.split(regex)

  return parts.map((part, index) =>
    regex.test(part)
      ? React.createElement(
          "span",
          { key: index, className: "bg-yellow-200 underline rounded-md" },
          part
        )
      : part
  )
}

export { highlightSearchTerm }
