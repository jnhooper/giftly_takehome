class ApiController < ApplicationController
  def places
    render json: Place.all.select(:id, :name, :logo_name).map{|p| add_logo_url(p.as_json)}
  end

  def place
    render json: Place.includes(:place_reviews).where(params[:place_id]).first
  end

  def add_review
  end

private
  def add_logo_url(place_json)
    place_json["logo_url"] = "#{request.base_url}/#{place_json["logo_name"]}"

    place_json
  end
end
