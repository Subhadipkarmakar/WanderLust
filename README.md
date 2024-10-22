# project1
<% layout("/layouts/boilarplate") %>
<div class="row mt-3">
    <div class="col-8 offset-3">
        <h3><b><%= listing.title %></b></h3>
    </div>
    <div class="card col-6 offset-3 show-card">
        <img src="<%= listing.image.url %>" class="card-img-top show-img" alt="listing_image">
        <div class="card-body">
            <p class="card-text">
                <%= listing.description %> <br>
                &#8377; <%= listing.price %> <br>
                <%= listing.location %> <br>
                <%= listing.country %> <br>
            </p>
        </div>
    </div>
</div>

<div class="btns">
    <a href="/listings/<%= listing._id %>/edit" class="btn btn-dark col-1 offset-3 edit-btn">Edit</a>

    <form action="/listings/<%= listing._id %>?_method=DELETE" method="post" novalidate class="needs-validation">
        <button class="btn btn-dark offset-5">Delete</button>
    </form> 
</div>
<br>

<div class="col-8 offset-3 mb-3 mt-3">
    <h4>Leave a Review</h4>
    <form action="/listings/<%= listing._id %>/reviews" method="post">
        <div class="mt-3 mb-3">
            <label for="rating" class="from-label">Rating</label>
            <input class="form-range" type="range" min="1" max="5" id="rating" name="review[rating]" required>
        </div>
        <div class="mt-3 mb-3">
            <label for="comment" class="from-label">Comment</label>
            <textarea name="review[comment]" id="comment" cols="30" rows="5" class="form-control" required></textarea>
            <div class="invalid-feedback">Please submit some comments for the review</div>
        </div>

        <!-- Hidden input for author (replace "user._id" with the logged-in user's ID) -->
        <input type="hidden" name="review[author]" value="<%= user ? user._id : '' %>"> <!-- Check if user is logged in -->

        <button class="btn btn-outline-dark">Submit</button>
    </form>
    <hr>

    <h4>All Reviews</h4>
    <% if (listing.reviews && listing.reviews.length) { %>
        <ul>
            <% listing.reviews.forEach(review => { %>
                <li>
                    <strong><%= review.author %>:</strong> <%= review.comment %> (Rating: <%= review.rating %>)
                </li>
            <% }); %>
        </ul>
    <% } else { %>
        <p>No reviews yet.</p>
    <% } %>
</div>
