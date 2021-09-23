Rails.application.routes.draw do

  namespace :public do
    get 'users/show'
    get 'users/index'
    get 'users/edit'
    get 'users/update'
  end
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  scope module: :public do
    root to: 'homes#top'
    resources :users
  end
end