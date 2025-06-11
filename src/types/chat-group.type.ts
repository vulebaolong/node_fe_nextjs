import { TUser } from "./user.type"

export interface ChatGroup {
  name: any
  userId: number
  Users: Users
  ChatGroupMember: ChatGroupMember[]
  id: number
  deletedBy: number
  isDeleted: boolean
  deletedAt: string
  createdAt: string
  updatedAt: string
}

export interface Users {
  email: string
  fullName: string
  avatar: string
  facebookId: any
  googleId: string
  roleId: number
  Roles: Roles
  id: number
  deletedBy: number
  isDeleted: boolean
  deletedAt: string
  createdAt: string
  updatedAt: string
}

export interface Roles {
  name: string
  description: string
  isActive: boolean
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

