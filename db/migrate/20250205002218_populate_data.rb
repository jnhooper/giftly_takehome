class PopulateData < ActiveRecord::Migration[7.2]
  def change
    Place.find_or_create_by!(
      name: "Target",
      logo_name: "target.png",
    )

    Place.find_or_create_by!(
      name: "Walmart",
      logo_name: "walmart.png",
    )

    Place.find_or_create_by!(
      name: "IKEA",
      logo_name: "ikea.png"
    )

    PlaceReview.find_or_create_by!(
      author_name: "Craig",
      review_text: "Great place to get meatballs!",
      rating: 3,
      place_id: Place.find_by(name: "IKEA").id
    )

    PlaceReview.find_or_create_by!(
      author_name: "Craig",
      review_text: "There were no targets in this store!",
      rating: 1,
      place_id: Place.find_by(name: "Target").id
    )
  end
end
