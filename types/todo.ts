export type TodoData = {
  id: number,
  uuid: string,
  name: string,
  comment: string,
  state: TodoState,
}

export type TodoState = 'COMPLETE' | 'IN_COMPLETE'
export type TodoStateFilter = 'ALL' & TodoState
