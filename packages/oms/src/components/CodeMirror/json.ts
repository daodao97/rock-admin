import 'codemirror/addon/lint/json-lint.js'

// import jsonLint from 'jsonlint'

export function isJson(str) {
  str = str.replace(/\/\/[^"]+?$/gm, '').replace(/^\s*\/\/.*?$/gm, '')
  try {
    // jsonLint.parse(str)
    return true
  } catch (e) {
    return e.message
  }
}

export function showErrorGutter(checkResult, cm) {
  if (checkResult !== '' && checkResult !== 'Invalid array length') {
    const match = /Parse error on line (\d+)/.exec(checkResult)
    const line = parseInt(match[1]) - 1 || 1
    const div = document.createElement('i')
    div.setAttribute('class', 'el-tag__close el-icon-close line-error')
    cm.setGutterMarker(line, 'note-gutter', div)
  }
}

export function clearErrorGutter(cm) {
  cm.clearGutter('note-gutter')
}
