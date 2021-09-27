class Item < ApplicationRecord
  attr_accessor :x, :y, :width, :height
  belongs_to :user
  mount_uploader :itemimage, ItemimageUploader
end
