import { Parser } from 'node-sql-parser'
import { ctrls } from './form'

const ignoreFields = ['id', 'updated_at', 'created_at']

const typs = []

Object.keys(ctrls).forEach(item => {
  typs.push({ value: item, label: ctrls[item].name })
})

export const sqlSchema = {
  options: {
    submitButton: false,
    cancelButton: false
  },
  formItems: [
    {
      type: 'sub-form',
      field: 'columns',
      props: {
        repeat: true,
        formItems: [
          {
            type: 'input',
            field: 'field',
            label: '字段key'
          },
          {
            type: 'select',
            field: 'type',
            label: '类型',
            options: typs
          },
          {
            type: 'input',
            field: 'label',
            label: '字段label'
          }
        ]
      }
    }
  ]
}

export default function(sql) {
  const parser = new Parser()
  const ast = parser.astify(sql.trim())
  if (ast.type !== 'create') {
    return []
  }
  const formItems = []
  ast.create_definitions
    .filter(item => item.resource === 'column')
    .forEach(item => {
      console.log(item)
      if (ignoreFields.indexOf(item.column.column) === -1) {
        formItems.push({
          field: item.column.column,
          label: item.comment ? item.comment.value.value : item.column.column,
          type: ''
        })
      }
    })
  return formItems
}
