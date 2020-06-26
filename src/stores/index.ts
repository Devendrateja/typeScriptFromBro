// All the stores will be initialised here

import TodoService from '../services/TodoService/index.api'
import PostsFixtureService from '../services/PostService/index.fixture'
import PostStore from './PostStore'
import TodoStore from './TodoStore'

const todoStore = new TodoStore(new TodoService())

const postStore = new PostStore(new PostsFixtureService())

const stores = {
  todoStore,
  postStore
}

export default stores
