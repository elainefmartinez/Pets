const { User, Post } = require("../models");
const {AuthenticationError} = require ("apollo-server-express"); 
const { findByIdAndUpdate} = require("../models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {


        //note using this stops undefined constantly running in background
        //may need to look at type defs
        // posts: async () => {
        //     return await Post.find();
        // },

        //change I made
        //so I had to rename this to match typedefs so it doesn't shoot undefined
        postsMade: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Post.find(params);
          },

        //delete or update to findUserbyId context.user is undifined
        // user: async (parent, args, context) => {
        //     if (context.user) {
        //         const user = await User.findById(context.user._id).populate({
        //             path: 'posts',
        //             populate: 'post'
        //         });

        //         return user;
        //     }

        //     throw new AuthenticationError('Not logged in');
        // },
        //new code I added to test
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('postsMade');
          },

        users: async () => {
            return User.find().populate('postsMade');
          },

        // post: async (parent, { _id }) => {
        //     return await Post.findById(_id);
        // },

        //new code I added to test
        post: async (parent, { postId }) => {
            return Post.findOne({ _id: postId });
          },
        ///come back to query later to fix user context
       
        me: async (parent, args, context) => {
            console.log("hello")
            if (context.user) {
                //tweaked next line to add a populate
              console.log("Inner")
                const usr = await User.findOne({ _id: context.user._id }).populate('postsMade');
                console.log("Got the usr", usr);
                return usr;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    },
    Mutation: {
        //Important Note: Missing add comment, remove comment, remove post
        
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        // addPost: async (parent, args, context) => {
        //     console.log(context);
        //     if (context.user) {
        //         const post = await Post.create(args);

        //         await User.findByIdAndUpdate(context.user._id, { $push: { posts: post } });

        //         return post;
        //     }

        //     throw new AuthenticationError('Not logged in');
        // },
        //new code I added
        addPost: async (parent, { post } , context) => {
            const { postTitle, postText, postAuthor } = post;
            if (context.user) {
              const post = await Post.create({
                postTitle,
                postText,
                postAuthor: context.user.username,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { postsMade: post._id } }
              );
      
              return post;
            }
            throw new AuthenticationError('You need to be logged in!');
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

