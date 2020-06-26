import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import PostModel from '../../../stores/models/PostModel'

interface PostProps {
  post: PostModel
  sno: number
}

@observer
class Post extends Component<PostProps> {
  @observable count: number = 0

  increaseCount = () => {
    this.count += 1
  }

  render() {
    const { post, sno } = this.props
    const { title, body } = post
    this.increaseCount()
    return (
      <div>
        <div>
          {this.count}.{title}
        </div>
        <div>{body}</div>
      </div>
    )
  }
}

export default Post
