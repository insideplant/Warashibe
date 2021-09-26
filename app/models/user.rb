class User < ApplicationRecord
  has_one :item, dependent: :destroy
  accepts_nested_attributes_for :item
  mount_uploader :avatar, AvatarUploader

  # Include default devise modules. Others aviailable are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, presence: true
end
