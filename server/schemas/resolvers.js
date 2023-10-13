const { User, Post } = require("../models");
const {AuthenticationError} = require ("apollo-server-express"); 
const { findByIdAndUpdate} = require("../models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        posts: async () => {
            return await Post.find();
        },

        //delete or update to findUserbyId context.user is undifined
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
        },
        ///come back to query later to fix user context
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('posts');
            }
            throw new AuthenticationError('You need to be logged in!');
          },
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
        }
    }
};

module.exports = resolvers;

