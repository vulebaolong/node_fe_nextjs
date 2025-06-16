import { TUser } from "./user.type"

export interface ChatGroup {
  name: any
  ownerId: number
  Owner: TUser
  ChatGroupMembers: ChatGroupMember[]
  id: number
  deletedBy: number
  isDeleted: boolean
  deletedAt: string
  createdAt: string
  updatedAt: string
}

export interface ChatGroupMember {
  userId: number
  Users: TUser
  chatGroupId: number
  id: number
  deletedBy: number
  isDeleted: boolean
  deletedAt: string
  createdAt: string
  updatedAt: string
}



