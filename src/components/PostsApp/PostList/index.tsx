import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import PostModel from '../../../stores/models/PostModel'
import Post from '../posts'

interface PostsListProps {
  posts: Array<PostModel>
}

@observer
class PostsList extends Component<PostsListProps> {
  getPosts = () => {
    const { posts } = this.props

    return (
      <div>
        {posts.map((eachPost, index) => {
          return <Post key={eachPost.id} sno={index + 1} post={eachPost} />
        })}
      </div>
    )
  }

  render() {
    const { posts } = this.props
    return this.getPosts()
  }
}

export default PostsList
