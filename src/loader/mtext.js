/*
 * Copyright (c) 2020-present Prolincur Technologies LLP.
 * All Rights Reserved.
 */

// Converts raw MTEXT content into displayable text, following the inline format codes of the
// AutoCAD MTEXT specification. Formatting the loader cannot render (font, color, height,
// underline, ...) is dropped; text, line breaks, stacked fractions and paragraph alignment are kept.

const SPECIAL_CHARACTERS = { d: '°', c: '⌀', p: '±', '%': '%' }
const PARAGRAPH_ALIGNMENTS = { l: 'left', c: 'center', r: 'right', j: 'justify', d: 'justify' }
const LINE_BREAK_CODES = 'PXN'
const TOGGLE_CODES = 'LlOoKk'
const CODES_WITH_ARGUMENT = 'ACcFfHQTW'
const STACK_SEPARATORS = ['^', '/', '#']
const TEXT_TOGGLE_CODES = 'uok'

// Converts raw TEXT / ATTDEF content: %%d, %%c, %%p and %%% become their symbols and %%nnn the
// character with that code; %%u / %%o / %%k (underline / overline / strike-through) are not rendered.
export function parseText(raw) {
  return (raw || '').replace(/%%(\d{3}|.)/g, (match, code) => {
    if (/^\d{3}$/.test(code)) return String.fromCharCode(parseInt(code, 10))
    const lower = code.toLowerCase()
    if (TEXT_TOGGLE_CODES.includes(lower)) return ''
    return SPECIAL_CHARACTERS[lower] ?? match
  })
}

export function parseMText(raw) {
  const input = raw || ''
  let text = ''
  let horizontalAlignment
  let i = 0

  // Reads a code argument starting at index `start`, up to the next unescaped ';'
  const readArgument = (start) => {
    let arg = ''
    let j = start
    while (j < input.length && input[j] !== ';') {
      if (input[j] === '\\' && j + 1 < input.length) j += 1
      arg += input[j]
      j += 1
    }
    return { arg, next: j + 1 }
  }

  while (i < input.length) {
    const ch = input[i]

    if (ch === '\\' && i + 1 < input.length) {
      const code = input[i + 1]
      i += 2
      if (LINE_BREAK_CODES.includes(code)) {
        text += '\n'
      } else if (code === '~') {
        text += ' '
      } else if (code === '\\' || code === '{' || code === '}') {
        text += code
      } else if (TOGGLE_CODES.includes(code)) {
        // underline / overline / strike-through: not rendered
      } else if (code === 'U' && input[i] === '+') {
        // \U+XXXX unicode character
        const hex = input.slice(i + 1, i + 5)
        if (/^[0-9a-fA-F]{4}$/.test(hex)) {
          text += String.fromCharCode(parseInt(hex, 16))
          i += 5
        }
      } else if (code === 'M' && input[i] === '+') {
        // \M+nXXXX multibyte character: needs the drawing code page, skipped
        i += 6
      } else if (code === 'S') {
        // \Snumerator^denominator; (also '/' and '#' separators)
        const { arg, next } = readArgument(i)
        const separator = STACK_SEPARATORS.find((s) => arg.includes(s))
        if (separator) {
          const index = arg.indexOf(separator)
          text += arg.slice(0, index) + '/' + arg.slice(index + 1)
        } else {
          text += arg
        }
        i = next
      } else if (code === 'p') {
        // \pxqc; paragraph properties, only the alignment is used
        const { arg, next } = readArgument(i)
        const alignment = arg
          .replace(/^x/, '')
          .split(',')
          .find((part) => part.startsWith('q'))
        if (alignment && PARAGRAPH_ALIGNMENTS[alignment[1]]) {
          horizontalAlignment = PARAGRAPH_ALIGNMENTS[alignment[1]]
        }
        i = next
      } else if (CODES_WITH_ARGUMENT.includes(code)) {
        i = readArgument(i).next
      } else {
        text += code
      }
    } else if (ch === '{' || ch === '}') {
      i += 1
    } else if (
      ch === '%' &&
      input[i + 1] === '%' &&
      SPECIAL_CHARACTERS[input[i + 2]?.toLowerCase()]
    ) {
      text += SPECIAL_CHARACTERS[input[i + 2].toLowerCase()]
      i += 3
    } else {
      text += ch
      i += 1
    }
  }

  return { text, horizontalAlignment }
}
