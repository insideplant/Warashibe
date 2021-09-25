class Public::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @item = Item.new
  end

  def index
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
  end
end
