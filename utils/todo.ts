import {BvTableField} from "bootstrap-vue";

type TableField = ({ key: string, width?: string } & BvTableField)

export const getTodoTableFields = (): TableField[] => {
  return [
    {
      key: 'id',
      label: 'ID',
      width: '50px',
    },
    {
      key: 'name',
      label: '名称',
      width: '300px'
    },
    {
      key: 'comment',
      label: 'コメント',
      width: '450px',
    },
    {
      key: 'state',
      label: '状態',
      width: '100px',
      tdClass: 'vertical-middle'
    },
    {
      key: 'deleted',
      label: '',
      width: '100px',
      tdClass: 'vertical-middle'
    },
  ]
}
