import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import LoadingWrapperWithFailure from '../../components/common/LoadingWrapperWithFailure'
import PostStore from '../../stores/PostStore'
import PostsList from '../../components/PostsApp/PostList'

interface PostsRouteProps {}

interface InjectedProps extends PostsRouteProps {
  postStore: PostStore
}

@inject('postStore')
@observer
class PostsRoute extends Component<PostsRouteProps> {
  componentDidMount() {
    this.doNetworkCalls()
  }

  doNetworkCalls = () => {
    const { getPostList } = this.getPostStore()
    getPostList()
  }

  getInjectedProps = (): InjectedProps => this.props as InjectedProps

  getPostStore = () => {
    return this.getInjectedProps().postStore
  }

  renderSuccessUI = observer(() => {
    const { posts, getPostListStatus, getPostListError } = this.getPostStore()
    return <PostsList posts={posts} />
  })

  render() {
    const { posts, getPostListStatus, getPostListError } = this.getPostStore()
    return (
      <LoadingWrapperWithFailure
        apiStatus={getPostListStatus}
        apiError={getPostListError}
        onRetryClick={this.doNetworkCalls}
        renderSuccessUI={this.renderSuccessUI}
      />
    )
  }
}

export default PostsRoute
//   < PostList
// postList = { posts }
// apiStatus = { getPostListStatus }
// apiError = { getPostListError }
// onRetryClick = { this.doNetworkCalls }
//   />
