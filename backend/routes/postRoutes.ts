// import express, {Request, Response} from "express";
// const express = require('express');
// const router = express.Router();
// const Post = require('../models/Post');

// router.get('/posts', async (req, res) => {
//     try{
//         const posts = await Post.find();
//         res.json(posts);
//     } catch (error) {
//         res.status(500).json({ message: error.message});
//     }
// });

// router.get('/posts/:id', async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if (!post) return res.status(404).json({ message: 'Post not found.'});
//         res.json(post);
        
//     } catch (error) {
//         res.status(500).json({ message: error.message});
        
//     }
    
// });

// router.post('/posts', async (req, res) => {
//     const post = new Post({
//         title: req.body.title,
//         content: req.body.content,
//         author: req.body.author
//     });

//     try {
//         const newPost = await post.save();
//         res.status(201).json(newPost);        
//     } catch (error) {
//         res.status(400).json({message: error.message});        
//     }
    
// });

// router.put('/posts/:id', async (req, res) => {
//     try {
//         const updatePost = await Post.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true}
//         );
//         if (!updatePost) return res.status(404).json({ message: 'Post not found/updated.'});
//         res.json(updatePost);  
//     } catch (error) {
//         res.status(400).json({ message: error.message});        
//     }
// });


// router.delete('/posts/:id', async (req, res) => {
//     try{
//         const post = await Post.findById(req.params.id);
//         if (!Post) return res.status(404).json({ message: 'Post not found'});
//         await post.remove();
//         res.json({ message: 'Post deleted.'});
//     } catch(error){
//         res.status(500).json({ message: error.message});
//     } 
// });

// export default router;