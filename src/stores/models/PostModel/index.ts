import { observable, action, computed } from 'mobx'
import { PostObject } from '../../types'

class PostModel {
  id: number
  userId: number
  @observable title: string
  @observable body: string

  constructor(post: PostObject) {
    this.id = post.id
    this.userId = post.userId
    this.title = post.title
    this.body = post.body
  }
}

export default PostModel
