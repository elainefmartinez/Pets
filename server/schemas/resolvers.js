const { User, Post } = require("../models");
const {AuthenticationError} = require ("apollo-server-express"); 
const { findByIdAndUpdate} = require("../models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        posts: async () => {
            return await Post.find();
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'posts',
                    populate: 'post'
                });

                return user;
            }

            throw new AuthenticationError('Not logged in');
        },
        post: async (parent, { _id }) => {
            return await Post.findById(_id);
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addPost: async (parent, args, context) => {
            console.log(context);
            if (context.user) {
                const post = await Post.create(args);

                await User.findByIdAndUpdate(context.user._id, { $push: { posts: post } });

                return post;
            }

            throw new AuthenticationError('Not logged in');
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
        },
        updatePost: async (parent, args, context) => {
            if (context.post) {
                return await Post.findByIdAndUpdate(context.post._id, args, { new: true });
            }

            throw new AuthenticationError('Not logged in');
        },
        addComment: async (parent, { postId, comment_text }, context) => {
            console.log(context);
            if (context.user) {
                return Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $addToSet: {
                            comments: { comment_text, comment_user: context.user.username },
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeComment: async (parent, { postId, commentId }, context) => {
            if (context.user) {
                return Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $pull: {
                            comments: {
                                _id: commentId,
                                comment_user: context.user.username
                            },
                        },
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removePost: async (parent, { postId }, context) => {
            if (context.user) {
                const post = await Post.findOneAndDelete({
                    _id: postId,
                    post_author: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { posts_made: post._id } }
                );

                return post;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;

