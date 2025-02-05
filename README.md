# README

# Rails application
There is a barebone rails application that exposes the following routes:

- GET /api/places -> returns a list of places in the db
- GET /api/place/${id} -> returns information about a singular place
- POST /api/add_review -> takes a hash of `{place_id:, author_name:, review_text:, rating:}`

To run the app locally run the following (uses a local sqlite database):
```
$ rake db:migrate
$ rails server
```

You should now be able to curl 127.0.0.1:3000/api/places and see results

# Assignment

Write a frontend application that can:
1. Display a place & any reviews for that place
2. Add a component that lets someone add their own review
3. Add a new endpoint (in Rails) that allows the editing an existing review & implement the frontend for editing

There is no mock that you need to match, you're free to change the responses from the server
to better suit your needs.  Do not worry about permissioning for adding or editing reviews
allow anyone to add a review or anyone to edit anyone elses review.
