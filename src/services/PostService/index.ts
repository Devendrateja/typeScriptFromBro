import { postsResponse } from '../../stores/types'

export interface PostService {
  getPostsAPI: () => Promise<postsResponse>
}
