Rails.application.routes.draw do
  namespace :public do
    get 'items/create'
  end
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  scope module: :public do
    root to: 'homes#top'
    resources :users
    resources :items, only: [:create]
  end
end