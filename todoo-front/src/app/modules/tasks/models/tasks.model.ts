export interface ITask{
  status: string,
  data: ITaskDataInfo[]
}

export interface ITaskData{
  name: string,
  status: string,
  description: string,
}

export interface ITaskDataInfo extends ITaskData{
  userId: number,
  updatedAt: Date,
  createdAt: Date,
  id: number,
}
