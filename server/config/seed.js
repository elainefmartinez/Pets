const db = require('./connection');
const { User, Post } = require('../models');

db.once('open', async () => {
    await Post.deleteMany();

    const posts = await Post.insertMany([
        {
            post_text: 'I love dogs!',
            post_title: 'Dog thoughts',
            comments: [{
                comment_text: 'me too!',
                comment_user: 'artorrias'
            }]
        },
        { 
            post_text: 'I love cats!', 
            post_title: 'Cat thoughts', 
            comments: [{
                comment_text: 'me too!',
                comment_user: 'lokistarwind'
            },
            {
                comment_text: 'i actually hate cats.',
                comment_user: 'elainefmartinez'
            }]
        },
        { 
            post_text: 'I love birds!', 
            post_title: 'Bird thoughts', 
            comments: [{
                comment_text: 'me too!',
                comment_user: 'elainefmartinez'
            },
            {
                comment_text: 'birds are great!',
                comment_user: 'artorrias' 
            }] 
        },
        { 
            post_text: 'I love reptiles!', 
            post_title: 'Reptile thoughts', 
            comments: [] 
        }
    ]);

    await User.deleteMany();

    const users = await User.insertMany([
        {
            username: 'artorrias',
            email: 'superemail@email.com',
            password: 'happytime'
        },
        {
            username: 'username',
            email: 'email@email.com',
            password: 'sadtime'
        }
    ]);

    console.log('posts and users seeded');

    process.exit();
});