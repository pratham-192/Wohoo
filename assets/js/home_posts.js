{
    // method to submit form data for new post using ajax
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data);
                    //manually reseting the form data(bcoz of ajax)
                    $('#new-post-form')[0].reset();

                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    //enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function (post) {
        return $(`
    <div id="post-${post._id}" class="post">


    <div class="post-header">
        <h3 class="author">
            ${post.user.name}
        </h3>
        <p class="time">
        ${post.createdAt}
        </p>
    </div>

    <p class="post-content">
    ${post.content}
    </p>
    <div class="post-actions">
    <p class="like-value" id="Like-${post._id}">
    0
    </p>

    
            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
            
                <button class="like">Like</button>
            </a>

                        <a class="delete-post-button" href="/posts/destroy/${post._id}">
                            <button class="delete">Delete</button>
                        </a>

    </div>
        

            <div class="post-comments">

                <div class="post-comments-list">
                    <div id="post-comments-${post._id}" class="comment-container">
                    </div>
                </div>
            </div>
            <form action="/comments/create" id="post-${post._id}-comments-form" class="comment-form" method="POST">
            <input type="text" name="content" placeholder="Type Here to add comment...">
            <input type="hidden" name="post" value="${post._id}">
            <button type="submit">Submit</button>
            </form>
</div>
    `)
    }

    //method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });

        });
    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function () {
        $('#posts-list-container>div').each(function () {
            let self = $(this);
            // console.log("dsafsd");
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }


    createPost();
    convertPostsToAjax();
}