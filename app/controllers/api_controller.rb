class ApiController < ApplicationController
  def places
    render json: Place.all.select(:id, :name, :logo_name).map { |p| add_logo_url(p.as_json) }
  end

  def place
    puts params.inspect
    render json: Place.includes(
      :place_reviews
    ).where(id: params[:place_id]).first
  end

  def add_review
    p = PlaceReview.create!(
      place_id: params[:place_id],
      author_name: params[:author_name],
      review_text: params[:review_text],
      rating: params[:rating],
    )
    render json: p
  rescue => e
    render json: { status: "error", message: "Failed to create the review #{e.message}" }
  end

  def edit_review
    p = PlaceReview.find_by(id: params[:id])
    p.update!(
      review_text: params[:review_text],
      rating: params[:rating],
      author_name: params[:author_name]
    )
    render json: p
  rescue => e
    render json: { status: "error", message: "Failed to update the review #{e.message}" }
  end

  def delete
    PlaceReview.destroy_by(id: params[:id])
  rescue => e
    render json: { status: "error", message: "Failed to destroy the review #{e.message}" }
  end

private
  def add_logo_url(place_json)
    place_json["logo_url"] = "#{request.base_url}/#{place_json["logo_name"]}"

    place_json
  end
end
