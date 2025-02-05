class CreatePlaceReview < ActiveRecord::Migration[7.2]
  def change
    create_table :place_reviews do |t|
      t.string :author_name, null: false
      t.string :review_text, null: false
      t.integer :rating, null: false
      t.references :place, type: :bigint, foreign_key: true, null: false

      t.timestamps
    end
  end
end
