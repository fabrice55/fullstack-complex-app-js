const Post = require('../models/Post')
const { Resend } = require('resend')




exports.viewCreateScreen = function(req, res) {
    res.render('create-post')
}

exports.create = function(req, res) {
    let post = new Post(req.body, req.session.user._id)
    post.create().then(async function(newId) {
        
        const resend = new Resend(process.env.RESENDAPIKEY)
        const response = await resend.emails.send({
            from: 'onboarding@resend.com',
            to: 'bafshima12@gmail.com',
            subject:'Congrats on Creating a New Post!',
            html:'You did a <strong>great</strong> job of creating a post.'
        })
        console.log(response)
        req.flash("success", "New post successfully created.")
        req.session.save(() => res.redirect(`/post/${newId}`))
    }).catch(function(errors) {
        errors.forEach(error => req.flash("errors", error))
        req.session.save(() => res.redirect("/create-post"))
    })

}

exports.apiCreate = function(req, res) {
    let post = new Post(req.body, req.apiUser._id)
    post.create().then(function(newId) {
        res.json({message:"Success", createdPost:{title: req.body.title, body: req.body.body}})
    }).catch(function(errors) {
        res.json(errors)
    })

}

exports.viewSingle = async function(req, res) {
    try {
      let post = await Post.findSingleById(req.params.id, req.visitorId) 
      res.render('single-post-screen', {post: post, title: post.title}) 
    } catch {
        res.render("404")
    }
}

exports.viewEditScreen = async function(req, res) {
    try {
        let post = await Post.findSingleById(req.params.id, req.visitorId)
        if (post.isVisitorOwner) {
            res.render("edit-post", {post: post})
        } else {
            req.flash("errors", "You do not have permission to perform that action.")
            req.session.save(() => res. redirect("/"))
        }
    } catch {
        res.render("404")
    }
}

exports.edit = function(req, res) {
    let post = new Post(req.body, req.visitorId, req.params.id)
    post.update().then((status) => {
        // the post was successful updated in the database
        // or user did have permission, but there were validation errors
        if (status == "success") {
            // post was updated in the db
            req.flash("success", "Post successfully updated.")
            req.session.save(function() {
                res.redirect(`/post/${req.params.id}/edit`)
            })
        } else {
            post.errors.forEach(function(error) {
               req.flash("errors", error)
            })
            req.session.save(function() {
                res.redirect(`/post/${req.params.id}/edit`)
            })
        }

    }).catch(() => {
        // a post with the requested id doesn't exist
        // or if the current visitor is not the owner of the requested post
        req.flash("errors", "You do not have permission to perform that action.")
        req.session.save(function() {
            res.redirect("/")
        })
    })
} 

exports.delete = function(req, res) {
    Post.delete(req.params.id, req.visitorId).then(() => {
        req.flash("success", "Post sucessfully deleted.")
        req.session.save(() => res.redirect(`/profile/${req.session.user.username}`))

    }).catch(() => {
        req.flash("errors", "You do not have permission to perform that action.")
        req.session.save(() => res.redirect("/"))
    })
}

exports.apiDelete = function(req, res) {
    Post.delete(req.params.id, req.apiUser._id).then(() => {
       res.json({message:"Success", deletedPostId: req.params.id})
    }).catch(() => {
       res.json("You do not have permission to perform that action.")
    })
}

exports.search = function(req, res) {
    Post.search(req.body.searchTerm).then(posts => {
        res.json(posts)
    }).catch(() => {
        res.json([])
    })
}