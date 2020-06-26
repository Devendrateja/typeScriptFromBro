import getPostsResponse from '../../fixtures/getPostsResponse.json'
import { resolveWithTimeout } from '../../utils/TestUtils'
import { PostService } from './index'

class PostsFixtureService implements PostService {
  getPostsAPI() {
    return resolveWithTimeout(getPostsResponse)
  }
}

export default PostsFixtureService
