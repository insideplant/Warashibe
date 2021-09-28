class Public::ItemsController < ApplicationController
  def create
    @item = Item.new(item_params)
    @item.user_id = current_user.id
    @item.save
    redirect_to user_path current_user
  end

  def new
  end

  private
    def item_params
      params.require(:item).permit(:name, :info, :itemimage, :x, :y, :width, :height)
    end
end
