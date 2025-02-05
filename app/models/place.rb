class Place < ApplicationRecord
  has_many :place_reviews

  def as_json
    r = super
    r["place_reviews"] = place_reviews.as_json
    r
  end
end
