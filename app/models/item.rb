class Item < ApplicationRecord
  belongs_to :user
  mount_uploader :itemimage, ItemimageUploader
end
