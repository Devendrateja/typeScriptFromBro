import { observable, action, computed } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL, APIStatus } from '@ib/api-constants'

import PostsFixtureService from '../../services/PostService/index.fixture'
import PostModel from '../models/PostModel'

class PostStore {
  postService: PostsFixtureService
  @observable getPostListStatus!: APIStatus
  @observable getPostListError!: Error | null
  @observable posts!: Array<PostModel>
  @observable totalPosts!: number

  constructor(postService: PostsFixtureService) {
    this.postService = postService
    this.init()
  }

  @action.bound
  init() {
    this.getPostListStatus = API_INITIAL
    this.getPostListError = null
    this.posts = []
    this.totalPosts = 0
  }

  @action.bound
  setGetPostListStatus(status) {
    this.getPostListStatus = status
  }
  @action.bound
  setGetPostListError(error) {
    this.getPostListError = error
  }

  @action.bound
  setGetPostListResponse(response) {
    this.totalPosts = response.total
    this.posts = response.posts.map(post => {
      const newPost = new PostModel(post)
      return newPost
    })
  }

  @action.bound
  getPostList() {
    const promise = this.postService.getPostsAPI()
    return bindPromiseWithOnSuccess(promise)
      .to(this.setGetPostListStatus, this.setGetPostListResponse)
      .catch(this.setGetPostListError)
  }
}

export default PostStore
