import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import LoadingWrapperWithFailure from '../../components/common/LoadingWrapperWithFailure'
import PostStore from '../../stores/PostStore'
import PostsList from '../../components/PostsApp/PostList'

import { withTranslation, WithTranslation } from 'react-i18next'

interface PostsRouteProps extends WithTranslation {}

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
    const { t } = this.props
    return (
      <>
        <div>{t('posts:title')}</div>
        <div>{t('posts:name')}</div>
        <div>{t('posts:source')}</div>
        <div>{t('posts:idsLeft')}</div>
        <div>{t('posts:idsLeft_plural')}</div>
        <div>{t('posts:idsLeftWithParameter', { count: 1 })}</div>
        <div>{t('posts:idsLeftWithParameter', { count: 5 })}</div>
        <PostsList posts={posts} />
      </>
    )
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

export default withTranslation('translation', { withRef: true })(PostsRoute)
