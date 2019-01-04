import { Router } from 'express'
import Post from '../models/Post'
import mongoose from 'mongoose'

class PostController {
  constructor() {
    this.router = Router()
    this.initRoutes()
  }

  initRoutes() {
    this.router.get('/:uid', this.getPosts)
    this.router.post('/:uid', this.createPost)
    this.router.delete('/:postId', this.deletePost)
  }

  getPosts = async (req, res) => {
    try {
      const { uid } = req.params
      const posts = await Post.find({ creatorId: uid }).sort({ createdAt: -1 }).exec()
      res.json(posts)
    } catch (error) {
      console.log(error)
    }
  }

  createPost = async (req, res) => {
    try {
      const { uid } = req.params
      const { payload } = req.body

      const newPost = new Post({
        _id: new mongoose.Types.ObjectId(),
        creatorId: uid,
        ...payload,
      })

      await newPost.save()
      res.status(201).json(newPost)
    } catch (error) {
      res.status(500).json(error)
      console.log(error)
    }
  }

  deletePost = async (req, res) => {
    try {
      const { postId } = req.params

      const result = await Post.findByIdAndDelete(postId).exec()
      res.status(200).json(result)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new PostController().router