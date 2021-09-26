class Public::ItemsController < ApplicationController
  def create
    @item = Item.new(item_params)
    @item.user_id = current_user.id
    @item.save
    session[:crop_x] = item_params[:x]
    session[:crop_y] = item_params[:y]
    session[:crop_width] = item_params[:width]
    session[:crop_height] = item_params[:height]
    redirect_to user_path current_user
  end

  def new
  end

  private
    def item_params
      params.require(:item).permit(:name, :info, :image, :x, :y, :width, :height)
    end
end
